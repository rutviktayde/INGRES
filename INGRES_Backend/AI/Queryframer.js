// npm install @google/genai fuse.js
const data_retrive = require('../Routes/data_retrive');
const { GoogleGenAI } = require('@google/genai');
const Fuse = require('fuse.js');
const fs = require('fs');
const path = require('path');

// --- 1. LOAD VOCABULARY (The 6400 names) ---
// We load this ONCE when the server starts. It's fast.
const vocabPath = path.join(__dirname, 'vocab.json'); // Ensure vocab.json is in same folder

//Kushal here let me explain
// we are using fuzzy logic matching to match names of distinct loations 
// fuze.js is beiing used 

let vocabulary = [];
try {
    const raw = fs.readFileSync(vocabPath);
    vocabulary = JSON.parse(raw);
    console.log(`Loaded ${vocabulary.length} entities for search.`);
} catch (e) {
    console.error("WARNING: vocab.json not found. Run setup_vocab.js first.");
}




// --- 2. FUZZY MATCHING FUNCTION ---
function extractContext(userQuery) {
    if (vocabulary.length === 0) return "";

    const fuse = new Fuse(vocabulary, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3, // 0.0 is perfect match, 0.3 allows small typos
        ignoreLocation: true // Search anywhere in string
    });

    // Strategy: Search the *whole query* to find the best matching entities
    const results = fuse.search(userQuery);
    
    // Filter results: only keep high confidence matches
    // We limit to top 3 to avoid confusing the LLM with noise
    const topMatches = results
        .filter(r => r.score < 0.25) 
        .map(r => r.item)
        .slice(0, 3);

    if (topMatches.length === 0) return "";

    // Build a context string to tell the LLM what we found
    let contextMsg = `\n\n*** CONTEXT ANALYZER REPORT ***\nBased on your database, I have identified the following specific entities in the user's query:\n`;
    
    topMatches.forEach(match => {
        contextMsg += `- Name: "${match.name}" is a verified "${match.type}". (Column: "${match.type}")\n`;
    });
    contextMsg += `IMPORTANT: You MUST use the exact spelling "${topMatches[0].name}" in your SQL WHERE clause for the column "${topMatches[0].type}".\n*******************************\n`;

    return contextMsg;
}




// --- 3. MAIN FUNCTION ---
async function main(query) {
    let fullText = '';
    
    // STEP A: Get the "Smart Context"
    const entityContext = extractContext(query);
    
    // STEP B: Inject into Prompt
    const prompt = `You are a SQL and Data Visualization expert. Generate a JSON response for the user query: '${query}'.

${entityContext}  <-- THIS IS THE SECRET SAUCE

The table is 'data2024final2' in the 'ingres' database with the following schema:
- State (VARCHAR)
- District  (VARCHAR)
- "Assessment Unit  Name" (VARCHAR)  <-- Note: Use quotes for this column
- "Assessment Unit Type" (VARCHAR)
- "Recharge Worthy Area(Ha)" (INT)
- "Total Annual  Ground Water (Ham) Recharge" (DOUBLE)
- "Annual Extractable Ground Water Resource  (Ham)" (DOUBLE)
- "Total  Ground Water Extraction  (Ham)" (DOUBLE)
- "Stage of Ground Water  Extraction (%)" (DOUBLE)
- Categorization (VARCHAR)

Instructions:
1. Generate an optimized SQL query. **ALWAYS use double quotes for column names** (e.g., "Assessment Unit  Name").
2. Use the Context Report above to handle WHERE clauses correctly. If the report says 'Diglipur' is an 'Assessment Unit Name', write: WHERE "Assessment Unit  Name" = 'Diglipur'.
3. Select the most appropriate chart type from: "bar", "pie", "map", "line".
4. Create a descriptive title.
5. Generate 'data': 3-5 rows of REALISTIC MOCK DATA matching your SQL.
6. Define 'axis_labels'.

Output Format (Strict JSON only, no markdown):
{
  "sql": "SELECT ...",
  "chart_type": "bar",
  "title": "Title",
  "data": [],
  "axis_labels": {}
}

If the query cannot be answered, respond with: { "error": "Query cannot be answered with the given schema." }`;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = { temperature: 0.1 }; // Low temp for precision
  const model = 'gemini-2.0-flash';
  
  // ... (Your existing API call logic is fine, keeping it same below) ...
  try {
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      for await (const chunk of response) {
        if (chunk.text) fullText += chunk.text;
      }
  } catch (error) {
    console.error('Error during content generation:', error);
    return { error: "AI Generation Failed" };
  }

  // ... (Your existing Parsing Logic) ...
  // Remove markdown, parse JSON, etc.
  
  if (fullText.startsWith("```")) {
    const lines = fullText.split('\n');
    if (lines[0].startsWith("```")) lines.shift();
    if (lines[lines.length - 1].startsWith("```")) lines.pop();
    fullText = lines.join('\n');
  }

  // JSON Extraction Wrapper
  const jsonMatch = fullText.match(/\{[\s\S]*\}/);
  if (jsonMatch) fullText = jsonMatch[0];

  let parsed = null;
  try {
    parsed = JSON.parse(fullText);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return { error: "Invalid JSON from AI" };
  }

  let sql = parsed.sql;
  // Extra safety cleaning
  if (sql) {
      sql = sql.replace(/ILIKE/gi, "LIKE"); 
      // Removed the LOWER(DISTRICT) replace because our Context Injection handles the naming perfectly now.
  }
  
  console.log("Generated SQL:", sql);

  let answers = null;
  try {
    answers = await data_retrive(sql);
  } catch (error) {
      console.error("Error retrieving data:", error);
      return { error: "Database Execution Failed", details: error.message };
  }
  
  // Return the full package
  return answers;
}

module.exports = { main };