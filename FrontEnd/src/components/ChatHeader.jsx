import React from 'react';
import './ChatHeader.css';

const ChatHeader = () => {
  return (
    <header className="chat-header">
      <div className="header-content">
        <div className="bot-avatar-container">
          <div className="bot-avatar">
            <div className="water-drop">💧</div>
          </div>
          <div className="status-indicator"></div>
        </div>
        <div className="header-info">
          <h1 className="bot-title">Jal Sathi</h1>
          <p className="bot-subtitle">
            <span className="wave-icon">🌊</span>
            Ministry of Jal Shakti • Groundwater Assistant
          </p>
        </div>
        <div className="online-status">
          <div className="status-dot"></div>
          <span>Online</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
