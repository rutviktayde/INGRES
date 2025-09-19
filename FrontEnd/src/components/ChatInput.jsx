import React from 'react';
import './ChatInput.css';

const ChatInput = ({ 
  input, 
  setInput, 
  onSendMessage, 
  suggestions = [], 
  onSuggestionClick 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="input-area">
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about groundwater levels, irrigation, conservation schemes..."
            className="message-input"
          />
          <div className="input-icon">💬</div>
        </div>
        <button 
          onClick={onSendMessage} 
          disabled={!input.trim()}
          className={`send-button ${input.trim() ? 'active' : 'disabled'}`}
        >
          <span className="send-icon">➤</span>
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="suggestion-chip"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
