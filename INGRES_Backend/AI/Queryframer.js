// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
const data_retrive = require('../Routes/data_retrive');
const { GoogleGenAI } = require('@google/genai');
//to resolve error
async function main(query) {
    let fullText = '';
    user_query = query;
    let answers = null;
    prompt =`You are a SQL and Data Visualization expert. Generate a JSON response for the user query: '${user_query}'.

The table is 'grdwater' in the 'ingres' database with the following schema:
- State (VARCHAR)
- District  (VARCHAR)
- Assessment Unit  Name (VARCHAR)
- Assessment Unit Type (VARCHAR)
- Recharge Worthy Area(Ha) (INT)
- Total Annual  Ground Water (Ham) Recharge (DOUBLE)
- Annual Extractable Ground Water Resource  (Ham) (DOUBLE)
- Total  Ground Water Extraction  (Ham) (DOUBLE)
- Stage of Ground Water  Extraction (%) (DOUBLE)
- Categorization (VARCHAR)

Instructions:
1. Generate an optimized SQL query handling null values (use COALESCE where necessary).
2. Select the most appropriate chart type from: "bar", "pie", "map", "line".
3. Create a descriptive title.
4. Generate 'data': Since you cannot execute the query, generate 3-5 rows of REALISTIC MOCK DATA that matches the columns in your generated SQL. Use standard JSON format [{"label": "CategoryName", "value": 123.45}].
5. Define 'axis_labels' for the x and y axes.

Output Format (Strict JSON only, no markdown text):
{
  "sql": "SELECT ...",
  "chart_type": "bar",
  "title": "Descriptive Title Here",
  "data": [
    {"label": "Mock Category 1", "value": 10.5},
    {"label": "Mock Category 2", "value": 20.1}
  ],
  "axis_labels": {
    "x": "Label for X Axis",
    "y": "Label for Y Axis"
  }
}

If the query cannot be answered with the given schema, respond with: { "error": "Query cannot be answered with the given schema." }`; ;
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {};
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

try {
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });
      let fileIndex = 0;
    for await (const chunk of response) {
        if (chunk.text) {
            fullText += chunk.text;
        }
    }
} catch (error) {
    console.error('Error during content generation using api:', error);
}


console.log("Full Response: ", fullText);
console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
/// Remove markdown code fences if present
if (fullText.startsWith("```")) {
  const lines = fullText.split('\n');
  if (lines[0].startsWith("```")) lines.shift();
  if (lines[lines.length - 1].startsWith("```")) lines.pop();
  fullText = lines.join('\n');
}

// If multiple JSON objects are present, keep only the first one
const firstBrace = fullText.indexOf("{");
const lastBrace = fullText.lastIndexOf("}");
if (firstBrace !== -1 && lastBrace !== -1) {
  fullText = fullText.slice(firstBrace, lastBrace + 1);
}

// Parse JSON
let parsed = null;
try {
  parsed = JSON.parse(fullText);
} catch (error) {
  console.error("Error parsing JSON:", error, "\nRaw text:", fullText);
}

// Clean SQL
let sql = null;
let chart = null;
try {
  if (parsed) {
    sql = parsed.sql
      .replace(/ILIKE/gi, "LIKE")
      .replace(/DISTRICT/g, "LOWER(DISTRICT)");
    chart = parsed.chart;
  }
  console.log("SQL Query:", sql);
  console.log("chart type:", chart);
} catch (error) {
  console.error("Error in SQL cleaning:", error);
}

try {
  answers = await data_retrive(sql);
} catch (error) {
    console.error("Error retrieving data :", error);
}
  return answers;
}

module.exports = { main };