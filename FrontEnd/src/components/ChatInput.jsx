import React from 'react';

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
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(33, 150, 243, 0.1)',
      padding: '1.5rem',
      flexShrink: 0
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          flex: 1,
          position: 'relative',
          minWidth: 0
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about groundwater levels, irrigation, conservation schemes..."
            style={{
              width: '100%',
              padding: '0.875rem 1.125rem',
              paddingRight: '3rem',
              background: '#f5f5f5',
              border: '2px solid transparent',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
          />
          <div style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999',
            fontSize: '1.125rem',
            pointerEvents: 'none',
            transition: 'color 0.2s ease'
          }}>💬</div>
        </div>
        <button 
          onClick={onSendMessage} 
          disabled={!input.trim()}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            fontSize: '1.125rem',
            flexShrink: 0,
            background: input.trim() ? 'linear-gradient(135deg, #2196f3, #00bcd4)' : '#e0e0e0',
            color: input.trim() ? 'white' : '#999',
            boxShadow: input.trim() ? '0 4px 15px rgba(33, 150, 243, 0.3)' : 'none',
            transform: input.trim() ? 'none' : 'none'
          }}
        >
          <span style={{
            transform: 'rotate(-45deg)',
            transition: 'transform 0.2s ease'
          }}>➤</span>
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(33, 150, 243, 0.1)',
                color: '#1976d2',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                borderRadius: '1.5rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                fontWeight: 500
              }}
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
