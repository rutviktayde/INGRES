import React from 'react';
import '../App.css';

function About() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="bot-avatar">
            <div className="avatar-icon">💧</div>
          </div>
          <div className="header-text">
            <h1>About Jal Sathi</h1>
            <p>Your Groundwater Management Assistant</p>
          </div>
        </div>
      </header>
      
      <div className="about-container">
        <div className="about-content">
          <div className="about-section">
            <h2>Welcome to Jal Sathi!</h2>
            <p>
              Jal Sathi is an AI-powered chatbot designed to assist farmers, individuals, and resource managers in effectively managing groundwater resources. 
              Our mission is to provide accessible and accurate information to promote sustainable water usage and enhance agricultural productivity.
            </p>
          </div>

          <div className="about-section">
            <h3>What Jal Sathi Can Do For You</h3>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h4>Real-time Data</h4>
                <p>Get real-time information on groundwater levels and quality</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌱</div>
                <h4>Smart Irrigation</h4>
                <p>Receive personalized recommendations for irrigation based on crop type and soil conditions</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h4>Conservation Tips</h4>
                <p>Learn about efficient water conservation techniques</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h4>Data Insights</h4>
                <p>Access data-driven insights for resource planning and management</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h4>Expert Support</h4>
                <p>Connect with experts for further assistance and guidance</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h4>Smart Planning</h4>
                <p>Get recommendations for sustainable water resource management</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h3>Our Mission</h3>
            <p>
              Our goal is to empower communities with the knowledge and tools needed to make informed decisions about their water resources, 
              ensuring a sustainable future for all. We believe that access to accurate groundwater information should be available to everyone, 
              from small-scale farmers to large agricultural enterprises.
            </p>
          </div>

          <div className="about-section">
            <h3>Our Vision</h3>
            <p>
              To be the leading digital assistant for groundwater management, fostering water security and agricultural prosperity across regions. 
              We envision a future where every farmer and water manager has access to intelligent, data-driven insights for sustainable water resource management.
            </p>
          </div>

          <div className="about-section">
            <h3>Contact Us</h3>
            <p>
              For more information or support, please contact us at <strong>support@jalsathi.com</strong> or visit our website for additional resources and updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
