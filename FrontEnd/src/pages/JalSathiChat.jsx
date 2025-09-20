import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import ChatFooter from '../components/ChatFooter';

const JalSathiChat = () => {
  const [messages, setMessages] = useState([
    { 
      text: "नमस्ते! I'm Jal Sathi, your intelligent groundwater management assistant. I can help you with water level monitoring, irrigation planning, conservation strategies, and government schemes. How can I assist you today?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    'Water Level Status',
    'Irrigation Schedule', 
    'Conservation Tips',
    'Government Schemes',
    'Rainwater Harvesting',
    'Soil Moisture Analysis'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      
      // Simulate bot response
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          `Based on your query about "${input}", I can provide detailed information about groundwater management strategies, including monitoring techniques, sustainable irrigation practices, and water conservation methods.`,
          `Regarding "${input}", let me share some insights from the Jal Shakti Abhiyan data. I can help you understand water table levels, seasonal variations, and recommended conservation practices for your area.`,
          `Great question about "${input}"! As part of the Jal Shakti initiative, I can guide you through water budgeting, rainwater harvesting techniques, and efficient irrigation scheduling to optimize groundwater usage.`
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, { 
          text: randomResponse, 
          sender: 'bot', 
          timestamp: new Date() 
        }]);
      }, 1500);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 50%, #e0f7fa 100%)',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <ChatHeader />
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        minHeight: 0
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          minHeight: 0
        }}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isTyping && <ChatMessage isTyping={true} />}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput
          input={input}
          setInput={setInput}
          onSendMessage={handleSendMessage}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>
      
      <ChatFooter />
    </div>
  );
};

export default JalSathiChat;
