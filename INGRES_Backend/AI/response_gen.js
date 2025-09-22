// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
// const data_retrive = require('../Routes/data_retrive');
const { GoogleGenAI } = require('@google/genai');
let answers = null;
//to resolve error
let fullText = '';
let sql;
async function main(user_query,db_data) {
    user_query = query;
    prompt =`You are a virtual assistant for the INGRES groundwater system. Based on the user's question: '${user_query}', and the data returned from the database query: '${db_data}', generate a concise, accurate response. Summarize the key insights from the data, provide context from the schema (e.g., extraction stage, recharge values), and if the query involves trends or comparisons, suggest a visualization (e.g., bar chart for district comparisons). Keep the response user-friendly, multilingual if requested, and focused on decision-making for planners, researchers, or the public. If no data matches, say "No relevant data found." `;
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

console.log('full answer to query :',fullText);

}

module.exports = { main };