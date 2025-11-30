import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import JalSathiChat from "./pages/JalSathiChat";
import Signin from "./pages/Signin";   

function App() {
  return (
    <Router>
      <Routes>
        {/* Chat page is the main home */}
        <Route path="/" element={<JalSathiChat />} />
        <Route path="/chat" element={<JalSathiChat />} />

+       {/* Signin page */}
+       <Route path="/signin" element={<Signin />} />

        {/* Any unknown URL → go to chat */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
