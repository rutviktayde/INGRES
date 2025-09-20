// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

const { GoogleGenAI } = require('@google/genai');

async function main(query) {
    user_query = query;
    prompt =`Generate a SQL query or response for the user query: '${user_query}'. The table schema is fixed as follows: groundwater (DISTRICT: VARCHAR, ASSESSMENT_UNIT: VARCHAR, Stage_of_Ground_Water_Extraction: FLOAT, Ground_Water_Recharge_ham: FLOAT (with subcomponents: Rainfall_Recharge, Canals, Tanks_and_Ponds, etc.), Quality_Tagging: VARCHAR (Major_Parameter_Present, Other_Parameters_Present), Ground_Water_Extraction_ham: FLOAT (Domestic, Industrial, Irrigation), Net_Annual_Ground_Water_Availability_for_Future_Use_ham: FLOAT, In_Storage_Unconfined_Ground_Water_Resources_ham: FLOAT, Coastal_Areas: VARCHAR, etc.). Ensure the query is optimized, handles null values, and aligns with the dataset columns. If the query requests a visualization, suggest an appropriate chart type (e.g., bar, line, pie) and describe its structure. Return only the SQL query and chart type in a structured format: { "sql": "the query", "chart": "which one or null" }. If the query cannot be answered with the given schema, respond with "Query cannot be answered with the given schema."`; ;
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {};
  const model = 'gemini-2.5-pro';
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

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
let fullText = '';
for await (const chunk of response) {
    if (chunk.text) {
        fullText += chunk.text;
    }
}


// / Remove markdown code fences if present
if (fullText.startsWith("```")) {
  // Remove the first line (```json) and the trailing fences
  const lines = fullText.split('\n');
  // Remove first line and any last line that is just ```
  if (lines[0].startsWith("```")) {
    lines.shift();
  }
  if (lines[lines.length - 1].startsWith("```")) {
    lines.pop();
  }
  fullText = lines.join('\n');
}
// Parse the fullText as JSON
let parsed;
try {
  parsed = JSON.parse(fullText);
} catch (error) {
  console.error('Error parsing JSON:', error);
}
const sql = parsed ? parsed.sql : null;
console.log("SQL Query: ", sql);
//extracting sql query from the response
// const converting = JSON.parse(fullText);
// const sql = converting.sql;
// console.log("SQL Query: ", sql);
}

module.exports = { main };