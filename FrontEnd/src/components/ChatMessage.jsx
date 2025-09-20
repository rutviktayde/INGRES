import React from 'react';

const ChatMessage = ({ message, isTyping = false }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isTyping) {
    return (
      <div style={{
        display: 'flex',
        animation: 'fadeIn 0.3s ease-out',
        marginBottom: '0.5rem',
        justifyContent: 'flex-start'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.75rem',
          maxWidth: '80%',
          width: 'fit-content'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'transform 0.2s ease',
            background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
            color: 'white'
          }}>
            <span style={{ fontSize: '0.875rem' }}>💧</span>
          </div>
          <div style={{
            padding: '1rem 1.25rem',
            background: 'white',
            border: '1px solid #e3f2fd',
            borderRadius: '1.125rem',
            borderBottomLeftRadius: '0.375rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              gap: '0.25rem',
              alignItems: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#2196f3',
                borderRadius: '50%',
                animation: 'typing 1.4s infinite ease-in-out',
                animationDelay: '-0.32s'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#2196f3',
                borderRadius: '50%',
                animation: 'typing 1.4s infinite ease-in-out',
                animationDelay: '-0.16s'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#2196f3',
                borderRadius: '50%',
                animation: 'typing 1.4s infinite ease-in-out',
                animationDelay: '0s'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      animation: 'fadeIn 0.3s ease-out',
      marginBottom: '0.5rem',
      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.75rem',
        maxWidth: '80%',
        width: 'fit-content',
        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '0.75rem',
          fontWeight: 600,
          transition: 'transform 0.2s ease',
          background: message.sender === 'user' 
            ? 'linear-gradient(135deg, #757575, #9e9e9e)' 
            : 'linear-gradient(135deg, #2196f3, #00bcd4)',
          color: 'white'
        }}>
          {message.sender === 'user' ? (
            <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>You</span>
          ) : (
            <span style={{ fontSize: '0.875rem' }}>💧</span>
          )}
        </div>
        <div style={{
          padding: '0.875rem 1.125rem',
          borderRadius: '1.125rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          maxWidth: '100%',
          wordWrap: 'break-word',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          background: message.sender === 'user' 
            ? 'linear-gradient(135deg, #2196f3, #00bcd4)' 
            : 'white',
          color: message.sender === 'user' ? 'white' : '#333',
          border: message.sender === 'user' ? 'none' : '1px solid #e3f2fd',
          borderBottomRightRadius: message.sender === 'user' ? '0.375rem' : '1.125rem',
          borderBottomLeftRadius: message.sender === 'user' ? '1.125rem' : '0.375rem'
        }}>
          <div style={{
            fontSize: '0.875rem',
            lineHeight: 1.5,
            marginBottom: '0.5rem',
            wordBreak: 'break-word'
          }}>{message.text}</div>
          <div style={{
            fontSize: '0.75rem',
            opacity: 0.7,
            textAlign: message.sender === 'user' ? 'right' : 'left',
            color: message.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#666'
          }}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
