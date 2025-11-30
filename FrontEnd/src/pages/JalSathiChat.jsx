import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import "../App.css";
import { useNavigate } from "react-router-dom";   


const JalSathiChat = () => {
  const greetingText = `नमस्ते! I'm Jal Sathi, your intelligent groundwater management assistant. 
I can help you with water level monitoring, irrigation planning, conservation strategies, and government schemes. 
How can I assist you today?`;

  // ─────────────────────────────────────────────
  // GREETING TYPING ANIMATION
  // ─────────────────────────────────────────────
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    let i = 0;
    const speed = 25;

    const interval = setInterval(() => {
      setDisplayedGreeting(greetingText.slice(0, i));
      i++;
      if (i > greetingText.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  // ─────────────────────────────────────────────
  // CHAT STATE
  // ─────────────────────────────────────────────
  // ✅ START EMPTY → greeting is only in hero, not as a chat bubble
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const messagesEndRef = useRef(null);
  const initialRenderRef = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Do NOT auto-scroll on very first render → fixes “page slides down”
  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }
    if (messages.length === 0) return;
    scrollToBottom();
  }, [messages]);

  const hasUserMessages = messages.some((m) => m.sender === "user");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 🔐 Block chat if user is not logged in
    if (!isAuthenticated) {
    navigate("/signin");
    return;
    }

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    const messageText = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();

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
      const fallback = [
        `Based on your query about "${messageText}", I can provide insights on groundwater strategies.`,
        `Regarding "${messageText}", here’s something from the Jal Shakti data.`,
        `Great question about "${messageText}"! Let me share groundwater optimization tips.`,
      ];
      const random =
        fallback[Math.floor(Math.random() * fallback.length)];

      setMessages((prev) => [
        ...prev,
        {
          text: `⚠️ Backend connection failed. ${random}`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`gw-app ${darkMode ? "dark" : "light"}`}>
      {/* Floating Controls */}
      <div className="gw-floating gw-floating-left">
        <img src="/INGRES_LOGO.png" alt="INGRES" className="gw-floating-logo" />
      </div>

      <div className="gw-floating gw-floating-right">
        <button className="gw-icon-toggle" onClick={toggleTheme}>
          {darkMode ? "◐" : "◑"}
        </button>
         <button className="gw-auth-btn gw-auth-secondary" onClick={() => navigate("/signin")}>
            Sign in
          </button>
          <button className="gw-auth-btn gw-auth-primary" onClick={() => navigate("/signin")}>
            Sign up
          </button>
      </div>

      {/* Hero Section */}
      <section className={`gw-hero ${hasUserMessages ? "gw-hero-hidden" : ""}`}>
        <div className="gw-hero-inner">
          <img src="/INGRES_LOGO.png" alt="INGRES" className="gw-hero-logo" />
          <h1 className="gw-hero-title">Ground Water Data Search</h1>

          {/* TYPED GREETING (ABOVE SEARCH BAR) */}
          {!hasUserMessages && (
            <div className={`gw-typed-greeting ${typingDone ? "show" : ""}`}>
              {displayedGreeting}
            </div>
          )}

          {/* Search Bar */}
          {!hasUserMessages && (
            <>
              <div className="gw-hero-searchbar">
                <input
                  className="gw-search-input"
                  type="text"
                  placeholder="What do you want to know?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="gw-send-btn" onClick={handleSendMessage}>
                  ↑
                </button>
              </div>

              <div className="gw-analytics-row">
                <button className="gw-analytics-pill">Analytics-1</button>
                <button className="gw-analytics-pill">Analytics-2</button>
                <button className="gw-analytics-pill">Analytics-3</button>
              </div>

              <p className="gw-hero-footer">
                By using Ground Water Data Search, you agree to our{" "}
                <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Chat Messages */}
      <main className="gw-chat-shell">
        <div className="gw-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`gw-message-row ${
                msg.sender === "user"
                  ? "gw-message-row-user"
                  : "gw-message-row-bot"
              }`}
            >
              <div
                className={`gw-message-bubble ${
                  msg.sender === "user" ? "gw-message-user" : "gw-message-bot"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="gw-message-row gw-message-row-bot">
              <div className="gw-message-bubble gw-message-bot gw-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input */}
        {hasUserMessages && (
          <div className="gw-bottom-input">
            <textarea
              className="gw-bottom-textarea"
              placeholder="Ask anything about groundwater, irrigation, conservation..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="gw-send-btn gw-bottom-send"
              onClick={handleSendMessage}
            >
              ↑
            </button>
          </div>
        )}
      </main>
    </div>
  );
};




export default JalSathiChat;
