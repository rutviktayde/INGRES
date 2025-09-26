import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import ChatFooter from "../components/ChatFooter";

const JalSathiChat = () => {
  const [messages, setMessages] = useState([
    {
      text: "नमस्ते! I'm Jal Sathi, your intelligent groundwater management assistant. I can help you with water level monitoring, irrigation planning, conservation strategies, and government schemes. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Water Level Status",
    "Irrigation Schedule",
    "Conservation Tips",
    "Government Schemes",
    "Rainwater Harvesting",
    "Soil Moisture Analysis",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = {
        text: input,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      const messageText = input;
      setInput("");
      setIsTyping(true);

      try {
        // Send message to backend
        const response = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageText,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend response:", data);

        // Add bot response from backend
        setMessages((prev) => [
          ...prev,
          {
            text:
              data.aiResponse ||
              "I received your message but couldn't generate a response.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Error sending message to backend:", error);

        // Fallback to simulated response if backend fails
        const responses = [
          `Based on your query about "${messageText}", I can provide detailed information about groundwater management strategies, including monitoring techniques, sustainable irrigation practices, and water conservation methods.`,
          `Regarding "${messageText}", let me share some insights from the Jal Shakti Abhiyan data. I can help you understand water table levels, seasonal variations, and recommended conservation practices for your area.`,
          `Great question about "${messageText}"! As part of the Jal Shakti initiative, I can guide you through water budgeting, rainwater harvesting techniques, and efficient irrigation scheduling to optimize groundwater usage.`,
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          {
            text: `⚠️ Backend connection failed. ${randomResponse}`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          'url("/background.png") ,rgba(0, 0, 0, 0.5), no-repeat center center fixed',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      <ChatHeader />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minHeight: 0,
          }}
        >
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
