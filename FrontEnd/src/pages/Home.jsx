import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const features = [
    {
      icon: "💬",
      title: "Chat Share Functionality",
      description:
        "Share specific chatbot conversations or insights with colleagues and stakeholders for collaborative decision-making.",
    },
    {
      icon: "🗣️",
      title: "Plain Language Queries",
      description:
        "Ask groundwater-related questions in natural language without technical expertise required.",
    },
    {
      icon: "🔗",
      title: "Direct INGRES Integration",
      description:
        "Fetches authoritative data directly from the official groundwater database (India Ground Water Resource Estimation System).",
    },
    {
      icon: "🌐",
      title: "Multilingual Support",
      description:
        "Supports English and Indian regional languages for wider accessibility across diverse user groups.",
    },
    {
      icon: "📊",
      title: "Graph & Analysis Output",
      description:
        "Generates charts, maps, and visual insights directly within the chat interface.",
    },
    {
      icon: "📥",
      title: "Export Charts & Visuals",
      description:
        "Download generated visuals for reporting and presentations.",
    },
    {
      icon: "⚡",
      title: "Low Latency Responses",
      description:
        "Smart caching and optimized pipeline ensure instant query results.",
    },
    {
      icon: "💾",
      title: "Browser Data Caching",
      description:
        "Reduces redundant requests and improves overall performance.",
    },
  ];

  const stats = [
    { number: "1000+", label: "Assessment Units" },
    { number: "50+", label: "Regional Languages" },
    { number: "99.9%", label: "Uptime" },
    { number: "<1s", label: "Response Time" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Jal Sathi</span>
            </h1>
            <p className="hero-subtitle">
              Your AI-powered groundwater management assistant powered by INGRES
              data
            </p>
            <p className="hero-description">
              Access real-time groundwater data, historical assessments, and
              intelligent insights through our conversational AI interface.
              Built for planners, researchers, policymakers, and the general
              public.
            </p>
            <div className="hero-actions">
              <Link to="/chat" className="btn btn-primary">
                Start Chatting
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="water-animation"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">
            Powered by the official INGRES database and advanced AI technology
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGRES Integration Section */}
      <section className="ingres-section">
        <div className="ingres-container">
          <div className="ingres-content">
            <h2 className="section-title">Direct INGRES Integration</h2>
            <p className="ingres-description">
              Our AI chatbot is directly integrated with the{" "}
              <strong>
                India Ground Water Resource Estimation System (INGRES)
              </strong>
              , developed by CGWB and IIT Hyderabad. This ensures you get
              authoritative, real-time data from the official groundwater
              database.
            </p>
            <div className="ingres-features">
              <div className="ingres-feature">
                <span className="check-icon">✅</span>
                <span>
                  Real-time access to current and historical assessment results
                </span>
              </div>
              <div className="ingres-feature">
                <span className="check-icon">✅</span>
                <span>Interactive scientific diagrams and visualizations</span>
              </div>
              <div className="ingres-feature">
                <span className="check-icon">✅</span>
                <span>
                  Seamless integration for quick information retrieval
                </span>
              </div>
            </div>
            <div className="ingres-link">
              <a
                href="https://ingres.iith.ac.in/home"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Visit INGRES Portal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Explore Groundwater Data?</h2>
          <p className="cta-description">
            Start your conversation with Jal Sathi and discover insights about
            groundwater resources in your area.
          </p>
          <div className="cta-actions">
            <Link to="/chat" className="btn btn-primary btn-large">
              Get Started Now
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-large">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
