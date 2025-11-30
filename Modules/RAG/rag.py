import os
import google.generativeai as genai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# -----------------------------
# Load API KEY
# -----------------------------
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

EMBED_MODEL = "models/text-embedding-004"


# =========================================================
#                  KNOWLEDGE BASE LOADING
# =========================================================
def load_knowledge_base(path="knowledge_base.txt"):
    with open(path, "r", encoding="utf-8") as f:
        return f.read().split("\n")


# =========================================================
#                      EMBEDDING FUNCTIONS
# =========================================================
def embed_text(text):
    """Generate embeddings using Gemini embedding-004."""
    emb = genai.embed_content(
        model=EMBED_MODEL,
        content=text,
        task_type="retrieval_document"
    )
    return np.array(emb["embedding"])


def embed_kb(kb_lines):
    """Embed every line of the KB."""
    return [embed_text(line) for line in kb_lines]


# =========================================================
#                      RETRIEVAL
# =========================================================
def retrieve_kb_context(query, kb_lines, kb_embeddings, top_k=3):
    """Retrieve top relevant lines grounded in KB."""
    query_emb = embed_text(query)
    sims = cosine_similarity([query_emb], kb_embeddings)[0]

    top_idx = sims.argsort()[-top_k:][::-1]
    top_sentences = [kb_lines[i] for i in top_idx]

    return " ".join(top_sentences)


# =========================================================
#                  DATABASE GROUNDING
# =========================================================
def extract_relevant_db_row(db_json, query):
    """
    Industry pattern:
    1. Convert each DB row to text chunk
    2. Embed chunks
    3. Select best chunk
    """
    rows = db_json.get("data", [])
    row_texts = [str(row) for row in rows]

    row_embeddings = [embed_text(t) for t in row_texts]
    query_emb = embed_text(query)

    sims = cosine_similarity([query_emb], row_embeddings)[0]
    best_idx = int(np.argmax(sims))

    return rows[best_idx], row_texts[best_idx]


# =========================================================
#                    LLM FINAL ANSWER
# =========================================================
def generate_llm_answer(query, db_row, kb_context):
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
    You are a factual response generator. Use ONLY the grounded database row and knowledge base context below.

    USER QUESTION:
    {query}

    DATABASE CONTEXT (trusted factual):
    {db_row}

    KNOWLEDGE BASE CONTEXT (text file):
    {kb_context}

    Write a short, 3–4 line answer. Must be grounded in DB and KB. No hallucinations.
    """

    response = model.generate_content(prompt)
    return response.text.strip()


# =========================================================
#                      MAIN RAG PIPELINE
# =========================================================
def rag_pipeline(input_json, db_json):
    """
    input_json example:
    {
      "raw": "kamptee me pani ki level kitni hai?",
      "normalized": "What is the groundwater level in Kamptee?"
    }
    """

    query = input_json["normalized"]

    # 1. Load KB
    kb_lines = load_knowledge_base()
    kb_embeddings = embed_kb(kb_lines)

    # 2. Retrieve KB grounding
    kb_context = retrieve_kb_context(query, kb_lines, kb_embeddings)

    # 3. Retrieve DB grounding
    best_row, db_text = extract_relevant_db_row(db_json, query)

    # 4. Generate final grounded LLM answer
    final_answer = generate_llm_answer(
        query=query,
        db_row=best_row,
        kb_context=kb_context
    )

    # 5. Format final answer JSON
    return {
        "input": input_json,
        "detail": kb_context,
        "source": [
            "INGRES_DB (matched assessment unit row)",
            "Knowledge Base Text File",
            "Government Guidelines (GEC-2015)"
        ],
        "text": final_answer
    }
