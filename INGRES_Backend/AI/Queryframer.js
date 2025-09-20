// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
const data_retrive = require('../Routes/data_retrive');
const { GoogleGenAI } = require('@google/genai');

async function main(query) {
    user_query = query;
    prompt =`Generate a SQL query or response for the user query: '${user_query}'. The table is 'groundwater' in the 'ingres_db' database with the following schema:    DISTRICT VARCHAR(255),
    ASSESSMENT_UNIT VARCHAR(255),
    Rainfall_mm FLOAT,
    Total_Geographical_Area_ha FLOAT,
    Recharge_Worthy_Area_ha FLOAT,
    Hilly_Area_ha FLOAT,
    Rainfall_Recharge_Total FLOAT,
    Canals_Total FLOAT,
    Tanks_and_Ponds_Total FLOAT,
    Water_Conservation_Structure_Total FLOAT,
    Annual_Ground_Water_Recharge_Total FLOAT,
    Environmental_Flows_Total FLOAT,
    Annual_Extractable_Ground_Water_Resource_Total FLOAT,
    Ground_Water_Extraction_Domestic_Total FLOAT,
    Ground_Water_Extraction_Industrial_Total FLOAT,
    Ground_Water_Extraction_Irrigation_Total FLOAT,
    Ground_Water_Extraction_All_Uses_Total FLOAT,
    Stage_of_Ground_Water_Extraction FLOAT,
    Alloc_GW_Dom_Util_2025_ham FLOAT,
    Net_Annual_GW_Avail_Future_Use_ham FLOAT,
    Quality_Tagging_Major_Param_Present VARCHAR(255),
    Quality_Tagging_Other_Params_Present VARCHAR(255),
    Add_Pot_Resources_Spec_Cond_ham FLOAT,
    Waterlogged_Shallow_Water_Table FLOAT,
    Flood_Prone FLOAT,
    Spring_Discharge FLOAT,
    Coastal_Areas_Total FLOAT,
    In_Storage_Unconf_GW_Res_ham_Total FLOAT,
    Total_GW_Avail_Unconf_Aq_ham_Total FLOAT,
    Total_GW_Avail_in_Area_ham_Total FLOAT,
    Fresh FLOAT,
    Saline FLOAT. Ensure the query is optimized, handles null values, and aligns with the dataset columns. If the query requests a visualization, suggest an appropriate chart type (e.g., bar, line, pie) and describe its structure. Return only the SQL query and chart type in a structured format: { "sql": "the query", "chart": "which one or null" }. If the query cannot be answered with the given schema, respond with "Query cannot be answered with the given schema."`; ;
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
const chart = parsed ? parsed.chart : null;
console.log("chart type: ", chart);
//extracting sql query from the response
// const converting = JSON.parse(fullText);
// const sql = converting.sql;
// console.log("SQL Query: ", sql);
}

// data_retrive(sql);

module.exports = { main };