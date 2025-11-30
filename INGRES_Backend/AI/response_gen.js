// To run this code you need to install the following dependencies:
// npm install @google/genai
// npm install -D @types/node

const { GoogleGenAI } = require('@google/genai');


async function main(db_data,user_query) {
    let fullText = '';
    console.log('query', user_query);
    console.log('data', db_data);
    const data = JSON.stringify(db_data);
    // const prompt = `You are a friendly virtual assistant for the INGRES groundwater system, here to help with clear, helpful answers. For the user's question: '${user_query}', use the data from the database query: '${data}' to craft a concise response (under 150 words). Summarize key insights with simple explanations from the schema (e.g., extraction stage means how much groundwater is used vs. available). Sound natural and engaging, like chatting with an expert—start with a warm greeting if it fits. If trends or comparisons are involved, suggest a quick visualization (e.g., "A bar chart would show district differences nicely"). Make it user-friendly, multilingual if asked, and geared toward decision-making for planners, researchers, or the public. If no data matches, politely say "Sorry, no relevant data found—let's try refining your query!"`;
    // This is final prompt




    const prompt = `You are a friendly virtual assistant for the INGRES groundwater system,
    here to help with clear, 
    helpful answers. For the user's question: '${user_query}', use the data from the database 
    query: '${data}' to craft a concise response (under 150 words). Start with a warm, conversational 
    greeting like "Hi there!" or "Sure thing!", and sound natural—like chatting with a knowledgeable friend.
    Summarize key insights simply, explaining terms from the schema (e.g., "Extraction stage shows how much 
    groundwater is used vs. what's available"). Use engaging language, ask follow-up questions if it fits, 
    and keep it user-friendly—multilingual if requested. 
    Use \n for line breaks to improve readability, and ** for bold text** to highlight key points. 
    Gear toward decision-making for planners, researchers, or the public. If no data matches, 
    politely say "Sorry, no relevant data found—let's try refining your query!"`;

    console.log('See here',user_query, data);
    // process.exit(0)

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {}; // Add generation config if needed, e.g., { temperature: 0.7 }

    const model = 'gemini-2.5-pro'; // Updated to a likely current model name as of 2025; check docs for latest

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

        for await (const chunk of response) {
            if (chunk.text) {
                fullText += chunk.text;
            }
        }
    } catch (error) {
        console.error('Error during content generation using api:', error);
    }

    console.log('full answer to query :', fullText);
    return fullText; // Return the plain string instead of JSON.stringify
}

module.exports = { main };