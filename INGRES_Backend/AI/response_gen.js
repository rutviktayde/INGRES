// npm install @google/genai

const { GoogleGenAI } = require('@google/genai');

// --- CONFIGURATION ---
const MODEL_NAME = 'gemini-2.5-pro'; // Or 'gemini-2.0-flash' for speed
const API_KEY = process.env.GEMINI_API_KEY;

/**
 * Helper function to initialize the Gemini Client.
 * Implements a Singleton pattern to avoid re-initializing on every call.
 */
let googleAIClient = null;
function getClient() {
    if (!googleAIClient) {
        if (!API_KEY) {
            throw new Error("CRITICAL: GEMINI_API_KEY is missing in environment variables.");
        }
        googleAIClient = new GoogleGenAI({ apiKey: API_KEY });
    }
    return googleAIClient;
}

/**
 * Private helper to handle the actual API communication and streaming.
 * @param {string} prompt - The constructed prompt.
 * @returns {Promise<string>} - The generated text.
 */
async function _callGeminiAPI(prompt) {
    try {
        const ai = getClient();
        const config = { temperature: 0.7 };

        const result = await ai.models.generateContent({
            model: MODEL_NAME,
            generationConfig: config,
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        // Extract text safely
        let text = null;

        if (typeof result?.response?.text === "function") {
            text = result.response.text();
        } else if (Array.isArray(result?.candidates)) {
            text = result.candidates
                .flatMap(c => c.content?.parts || [])
                .map(p => p.text || "")
                .join("");
        }

        if (!text || text.trim() === "") {
            console.warn("⚠️ Gemini returned no readable text. Full result:", JSON.stringify(result, null, 2));
            throw new Error("Gemini returned a response but no usable text.");
        }

        return text.trim();

    } catch (error) {
        console.error("❌ Error inside Gemini API call:", error.message);
        return "I'm having trouble connecting right now. Please try again shortly.";
    }
}



/**
 * 1. SIMPLE RESPONSE GENERATOR (Data-Driven)
 * Focuses on explaining SQL results, trends, and numbers.
 * * @param {string} userQuery - The original question.
 * @param {object|array} dbData - The raw JSON data from the SQL query.
 */
async function generateSimpleResponse(dbData,userQuery) {
    console.log(`[SimpleResponse] Processing query this  is the question from the user: "${userQuery}"`);

    if (!dbData || (Array.isArray(dbData) && dbData.length === 0)) {
        return "Sorry, I couldn't find any relevant data in the database matching your specific criteria. Let's try refining your query (e.g., specifying a different district or year).";
    }

    const dataString = JSON.stringify(dbData);
    console.log("Data String for Prompt:", dataString);
    const prompt = `
    You are an expert Groundwater Data Analyst for INGRES (Ministry of Jal Shakti).
    
    ### TASK:
    Answer this user question: "${userQuery}" based **ONLY** on the database rows provided below.
    
    ### DATA RETRIEVED:
    ${dataString}
    
    ### INSTRUCTIONS:
    1. **Tone:** Warm, professional, and confident. Start with a brief greeting (e.g., "Here is the data for...").
    2. **Insight:** Don't just list numbers. Explain what they mean. (e.g., If 'Stage_of_Extraction' > 100%, mention it is 'Over-Exploited').
    3. **Schema Terms:** Briefly explain technical terms if used (e.g., "Recharge means water entering the aquifer").
    4. **Visualization:** If you see a comparison (multiple districts or years), explicitly add this sentence at the end: "A chart has been generated to visualize these figures."
    5. **Format:** Use **bolding** for district names and key values. Use bullet points for lists. Keep it under 150 words.
    
    Answer:
    `;
    
    return await _callGeminiAPI(prompt);
}

/**
 * 2. CUSTOM INSIGHTS GENERATOR (RAG-Driven)
 * Focuses on synthesizing unstructured text, policies, and complex reasoning.
 * * @param {string} userQuery - The original question.
 * @param {string} ragOutput - The text chunks retrieved from the Vector DB/Knowledge Base.
 */
async function generateCustomInsights(userQuery, ragOutput) {
    console.log(`[CustomInsights] Processing query: "${userQuery}"`);

    if (!ragOutput || ragOutput.length < 10) {
        return "I couldn't find specific documents or policies regarding that topic in my knowledge base. However, I can help you with general groundwater data.";
    }

    const prompt = `
    You are a Policy & Research Assistant for INGRES.
    
    ### TASK:
    Provide a detailed insight for: "${userQuery}" using the retrieved context documents.
    
    ### RETRIEVED CONTEXT (RAG):
    ${ragOutput}
    
    ### INSTRUCTIONS:
    1. **Synthesis:** Combine the retrieved chunks into a coherent answer. Do not say "The document says". Say "According to INGRES guidelines..." or "Ministry policies state...".
    2. **Attribution:** If specific stakeholders (e.g., 'Central Ground Water Board') are mentioned in the text, highlight them.
    3. **Actionable:** Focus on decision-making. What should a planner or researcher take away from this?
    4. **Limitations:** If the context doesn't fully answer the specific nuance, admit it politely.
    5. **Format:** Use clear paragraphs. **Bold** important policy names or Acts.
    
    Insight:
    `;

    return await _callGeminiAPI(prompt);
}

// Export functions for use in your main server
module.exports = { 
    generateSimpleResponse, 
    generateCustomInsights 
};