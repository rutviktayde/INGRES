import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Needed for handling the overlay state
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage"; // Note: You might need to add a "speaking" animation/indicator to ChatMessage
import ChatFooter from "../components/ChatFooter";
import Chat1on1 from "./Chat1on1"; // The voice input component
import { Mic } from "lucide-react";

// Fallback for cross-browser compatibility
const SpeechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis;

const JalSathiVoiceChat = () => {
  const [messages, setMessages] = useState([
    {
      text: "नमस्ते! I'm Jal Sathi, your intelligent groundwater assistant. Tap the mic button to start speaking your query.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // New state for TTS status
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  // Check the URL query parameter to see if the voice overlay should be active
  const isVoiceInputActive =
    new URLSearchParams(location.search).get("voice") === "true";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- Text-to-Speech (TTS) Logic ---
  const speakText = (text) => {
    if (!SpeechSynthesis) {
      console.warn("Web Speech Synthesis API not supported.");
      return;
    }

    // Stop any current speaking utterance before starting a new one
    SpeechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Setting language to Hindi-India for Jal Sathi context, adjust as needed
    // You can also change rate (speed) and pitch here.
    utterance.lang = "hi-IN";

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };

    SpeechSynthesis.speak(utterance);
  };

  // Effect to automatically speak the last bot message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "bot") {
      speakText(lastMessage.text);
    }
    // Cleanup: Stop speaking if the component unmounts or messages change dramatically
    return () => {
      if (SpeechSynthesis && SpeechSynthesis.speaking) {
        SpeechSynthesis.cancel();
      }
    };
  }, [messages]);

  // --- Main Chat Logic (Sends text to backend) ---

  const handleSendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;

    // 1. Add user message (the transcribed text)
    const userMessage = {
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // 2. Send message to backend
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const botResponseText =
        data.aiResponse ||
        "I received your message but couldn't generate a response.";

      // 3. Add bot response (The useEffect hook above will automatically speak it)
      setMessages((prev) => [
        ...prev,
        {
          text: botResponseText,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message to backend:", error);

      // Fallback response for TTS
      const fallbackResponse = `⚠️ Backend failed. I can still tell you about conservation tips.`;

      setMessages((prev) => [
        ...prev,
        {
          text: fallbackResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  // --- Voice Transcription Handler (Called by Chat1on1) ---
  const handleVoiceTranscription = (transcribedText) => {
    // 1. Send the transcribed text as a message
    handleSendMessage(transcribedText);
    // 2. Close the voice input overlay by removing the query parameter
    navigate(location.pathname, { replace: true });
  };

  // Handler to close the overlay without sending a message (e.g., if user cancels)
  const handleCancelVoiceInput = () => {
    // Close the voice input overlay by removing the query parameter
    navigate(location.pathname, { replace: true });
  };

  // --- Render ---

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          'url("/background.png") ,rgba(0, 0, 0, 0.5), no-repeat center center fixed',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      <ChatHeader />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          minHeight: 0,
        }}
      >
        {/* Messages Container */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minHeight: 0,
          }}
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              // Pass a prop to ChatMessage to show a pulsating effect on the bot's bubble
              // if it's the last message and it's currently speaking.
              isSpeaking={
                isSpeaking &&
                index === messages.length - 1 &&
                message.sender === "bot"
              }
            />
          ))}
          {isTyping && <ChatMessage isTyping={true} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Custom Voice Input Footer (A simple Mic Button) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            // When clicked, navigate to the same path but add the query param
            onClick={() => navigate("?voice=true")}
            style={{
              padding: "0.75rem",
              borderRadius: "50%",
              backgroundColor: isSpeaking ? "#ccc" : "rgb(34, 197, 94)",
              color: "white",
              border: "none",
              cursor: isSpeaking ? "not-allowed" : "pointer",
              boxShadow: isSpeaking
                ? "none"
                : "0 4px 15px rgba(34, 197, 94, 0.5)",
              transition: "all 0.3s ease",
            }}
            disabled={isSpeaking} // Disable while the bot is speaking
            title={isSpeaking ? "Bot is speaking..." : "Start Voice Chat"}
          >
            <Mic size={28} />
          </button>
        </div>
      </div>

      <ChatFooter />

      {/* Voice Input Overlay (Chat1on1) - Renders when ?voice=true is in the URL */}
      {isVoiceInputActive && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
        >
          <Chat1on1
            onVoiceTranscription={handleVoiceTranscription}
            onCancel={handleCancelVoiceInput} // Pass the new cancel handler
          />
        </div>
      )}
    </div>
  );
};

export default JalSathiVoiceChat;
