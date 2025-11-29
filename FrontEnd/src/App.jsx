import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import JalSathiChat from "./pages/JalSathiChat";

function App() {
  return (
    <Router>
      <Routes>
        {/* Chat page is the main home */}
        <Route path="/" element={<JalSathiChat />} />
        <Route path="/chat" element={<JalSathiChat />} />

        {/* Later we’ll add /login and /signup */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}

        {/* Any unknown URL → go to chat */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
