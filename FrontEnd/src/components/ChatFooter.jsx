import React from 'react';

const ChatFooter = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '0.75rem',
      fontSize: '0.75rem',
      color: '#666',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(5px)',
      borderTop: '1px solid rgba(33, 150, 243, 0.1)',
      flexShrink: 0
    }}>
      <p style={{
        margin: 0,
        fontWeight: 500
      }}>Powered by Ministry of Jal Shakti • Built for sustainable groundwater management</p>
    </div>
  );
};

export default ChatFooter;
