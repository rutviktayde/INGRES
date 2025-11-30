# INGRES Enhanced RAG System (Google Gemini - 100% FREE!)

An AI-powered groundwater intelligence assistant for Indian farmers using the INGRES (India Ground Water Resource Estimation System) data. This system uses **Google Gemini API** which is **completely FREE** - no credit card required!

## 🎉 Why This Is Great

- ✅ **100% FREE** - Uses Google Gemini's free tier
- ✅ **No Credit Card** - No payment setup needed
- ✅ **High Quality** - Excellent AI responses
- ✅ **Multi-language** - Hindi, English, and more
- ✅ **Fast** - Optimized for speed
- ✅ **Simple Setup** - Just one API key needed!

## Features

- **Google Gemini AI**: Uses Gemini's powerful and FREE language model
- **Multi-language Support**: Accepts queries in Hindi, English, and other Indian languages
- **Structured JSON Output**: Returns responses in a consistent, parseable format
- **All-in-One**: Single API for both LLM and embeddings
- **Three-Input Architecture**: 
  1. User Query (any language)
  2. JSON Database Input (current groundwater data)
  3. Knowledge Base (INGRES guidelines & best practices)
- **Smart Retrieval**: Uses vector search to find relevant information
- **Source Attribution**: Cites sources for all information provided

## Output Format

The system returns a structured JSON response:

```json
{
  "input": {
    "raw": "kamptee me pani ki level kitni hai?",
    "normalized": "What is the groundwater level in Kamptee?"
  },
  "detail": "Kamptee groundwater level in 2024 is 34.5 meters below ground level...",
  "source": [
    "INGRES_DB.groundwater_table (2024 latest record)",
    "GEC-2015 Guidelines"
  ],
  "text": "Kamptee's latest groundwater level is **34.5 meters below ground level**..."
}
```

## Installation

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd ingres-rag-system
```

### 2. Create Virtual Environment

```bash
python -m venv myvenv
source myvenv/bin/activate  # On Windows: myvenv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Get FREE Google Gemini API Key

**This is completely FREE - no credit card needed!**

1. Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (starts with `AIza...`)

### 5. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Google Gemini API (FREE - no payment required!)
GEMINI_API_KEY=AIza_your_gemini_api_key_here
```

### 6. Test Connection

```bash
python api_test_script.py
```

This will verify your Gemini API is working correctly.

### 7. Build Vector Database (First Time Only)

```bash
python -c "from rag_engine import build_vector_db; build_vector_db()"
```

This takes 5-10 minutes as it processes the knowledge base.

## Usage

### Option 1: Streamlit Web Interface (Recommended)

```bash
streamlit run app.py
```

Then open your browser to `http://localhost:8501`

**Steps:**
1. Click "Build Vector DB" in sidebar (first time only)
2. Enter your query in the User Query box
3. Paste JSON database data
4. Click "Get Answer"

### Option 2: Python API

```python
from rag_engine import EnhancedRAGEngine

# Initialize engine
rag_engine = EnhancedRAGEngine()

# Prepare inputs
query = "kamptee me pani ki level kitni hai?"
db_json = {
    "block_name": "Kamptee",
    "district": "Nagpur",
    "state": "Maharashtra",
    "water_level_mbgl": 34.5,
    "extraction_percentage": 94,
    "category": "Critical",
    "year": 2024
}

# Get response
result = rag_engine.answer_query(query, db_json)

# Access response
print(result['input']['normalized'])
print(result['text'])
```

### Option 3: Run Test Suite

```bash
python test_rag_system.py
```

## JSON Database Format

```json
{
  "block_name": "Kamptee",
  "district": "Nagpur",
  "state": "Maharashtra",
  "water_level_mbgl": 34.5,
  "extraction_percentage": 94,
  "category": "Critical",
  "year": 2024,
  "recharge_mcm": 45.2,
  "extraction_mcm": 42.5
}
```

## Example Queries

### Hindi
- `kamptee me pani ki level kitni hai?`
- `मेरे क्षेत्र में कौन सी फसल उगानी चाहिए?`
- `ड्रिप सिंचाई के लिए सब्सिडी कैसे मिलेगी?`

### English
- `What is the groundwater level in Kamptee?`
- `Can I drill a new borewell in critical area?`
- `What crops should I grow in semi-critical zones?`

## Project Structure

```
ingres-rag-system/
├── app.py                      # Streamlit web interface
├── rag_engine.py              # Enhanced RAG engine with Gemini
├── db_utils.py                # JSON processing utilities
├── api_test_script.py         # API connection tests
├── test_rag_system.py         # Full test suite
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables (create this)
├── docs/
│   └── Knowledge_Base.txt     # INGRES knowledge base
└── vector_store/              # Vector database (generated)
```

## Architecture Overview

```
User Query (Any Language) ──┐
                            │
JSON Database Input ────────┼──► Enhanced RAG Engine ──► Structured JSON Output
                            │      (Google Gemini - FREE!)
Knowledge Base ─────────────┘      

Processing Steps:
1. Query Normalization (Hindi/Regional → English) [Gemini]
2. JSON Context Extraction
3. Vector Search in Knowledge Base [Gemini Embeddings]
4. LLM Response Generation [Gemini]
5. Structured JSON Formatting
```

## Cost Comparison

| Provider | Cost per 1000 queries | Setup Complexity |
|----------|----------------------|------------------|
| **Google Gemini (Our Choice)** | **$0.00 (FREE!)** | ⭐ Easy |
| DeepSeek + OpenAI | $0.20 | ⭐⭐ Medium |
| Full OpenAI | $15-25 | ⭐ Easy |
| Local Models (Ollama) | $0.00 | ⭐⭐⭐ Complex |

## Rate Limits (Free Tier)

- **15 requests per minute** (1 query every 4 seconds)
- **1,500 requests per day**
- Perfect for development and moderate production use
- Upgrade to paid tier for higher limits (still very cheap!)

## Troubleshooting

### "Invalid API Key" Error

- Get free key: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- Check your `.env` file has `GEMINI_API_KEY=AIza...`
- Ensure no extra spaces in the key

### "Vector DB not found" Error

```bash
python -c "from rag_engine import build_vector_db; build_vector_db()"
```

### "Resource Exhausted" (Rate Limit)

- Wait 60 seconds and retry
- You've hit 15 requests per minute limit
- Add delay between requests: `time.sleep(4)`

### "Quota Exceeded" (Daily Limit)

- Wait until next day (resets at midnight PST)
- Or upgrade to paid tier (still cheap!)

### Import Errors

```bash
pip install --upgrade -r requirements.txt
```

## Upgrading (Optional)

Want more requests? Gemini's paid tier is very affordable:

- Input: $0.075 per 1M tokens (gemini-1.5-flash)
- Output: $0.30 per 1M tokens
- Still 10x cheaper than GPT-4!
- Same API key works for both free and paid tiers

## Performance Tips

- **Chunk Size**: Already optimized at 1000 characters
- **Number of Chunks**: Retrieves top 5 most relevant
- **Model**: Using `gemini-1.5-flash` (best balance)
- **Embeddings**: Using `text-embedding-004` (768-dim)
- **Caching**: Vector DB cached after first build

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

[Your License Here]

## Acknowledgments

- Central Ground Water Board (CGWB)
- IIT Hyderabad (INGRES Development)
- **Google** for FREE Gemini API access
- LangChain for RAG framework

## Support

For issues or questions:
- Check `GEMINI_SETUP.md` for detailed setup
- Run `python api_test_script.py` to diagnose issues
- Open a GitHub issue

## 🚀 Quick Start

```bash
# 1. Get free API key
# Visit: https://makersuite.google.com/app/apikey

# 2. Setup
pip install -r requirements.txt
echo "GEMINI_API_KEY=your_key_here" > .env

# 3. Test
python api_test_script.py

# 4. Build DB
python -c "from rag_engine import build_vector_db; build_vector_db()"

# 5. Run!
streamlit run app.py
```

**Total Cost: $0.00** 🎉

Enjoy unlimited groundwater intelligence for Indian farmers - **completely free**!