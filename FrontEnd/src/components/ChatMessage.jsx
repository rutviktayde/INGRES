import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message, isTyping = false }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isTyping) {
    return (
      <div className="message-wrapper bot-message">
        <div className="message-group">
          <div className="message-avatar bot">
            <span className="bot-icon"></span>
          </div>
          <div className="message-bubble bot typing-bubble">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`message-wrapper ${
        message.sender === "user" ? "user-message" : "bot-message"
      }`}
    >
      <div className="message-group">
        <div className={`message-avatar ${message.sender}`}>
          {message.sender === "user" ? (
            <span className="user-initial">👤</span>
          ) : (
            <span className="bot-icon"></span>
          )}
        </div>
        <div className={`message-bubble ${message.sender}`}>
          <div className="message-text">{message.text}</div>
          <div className="message-timestamp">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
