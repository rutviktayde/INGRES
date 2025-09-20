import React from 'react';

const ChatHeader = () => {
  return (
    <header style={{
      background: 'white',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderBottom: '4px solid #2196f3',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexShrink: 0
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          position: 'relative',
          flexShrink: 0
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{
              fontSize: '1.5rem',
              animation: 'float 3s ease-in-out infinite'
            }}>💧</div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '16px',
            height: '16px',
            background: '#4caf50',
            borderRadius: '50%',
            border: '2px solid white',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
        <div style={{
          flex: 1,
          minWidth: 0
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1976d2, #00acc1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.25rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>Jal Sathi</h1>
          <p style={{
            color: '#666',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <span style={{
              fontSize: '1rem',
              flexShrink: 0
            }}>🌊</span>
            Ministry of Jal Shakti • Groundwater Assistant
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: '#666',
          flexShrink: 0
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#4caf50',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          <span>Online</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
