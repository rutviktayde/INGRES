import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import JalSathiChat from "./pages/JalSathiChat";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
// We no longer route directly to the voice input UI.
// It will be used as an overlay inside the new voice chat page.
// import ChatBotUI from "./pages/Chat1on1";
import JalSathiVoiceChat from "./pages/JalSathiVoiceChat"; // NEW IMPORT
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Your original text-based chat */}
          <Route path="/chat" element={<JalSathiChat />} />

          {/* NEW ROUTE: The primary voice-enabled chat experience */}
          <Route path="/voice-chat" element={<JalSathiVoiceChat />} />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />

          {/* NOTE: The Chat1on1 component (which you import as ChatBotUI) 
            is now an overlay used internally by JalSathiVoiceChat, 
            so it should not be a standalone route.
            If you remove this line, remember to keep Chat1on1.jsx in /pages.
            <Route path="/chat1on1" element={<ChatBotUI />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
