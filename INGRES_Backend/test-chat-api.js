// Test script for the chat API
const fetch = require('node-fetch');

const testChatAPI = async () => {
  const testMessage = "Hello, I need help with water level monitoring";
  
  try {
    console.log('Testing chat API...');
    console.log('Sending message:', testMessage);
    
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: testMessage,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API Response received:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('Make sure the server is running on port 5000');
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  testChatAPI();
}

module.exports = testChatAPI;
