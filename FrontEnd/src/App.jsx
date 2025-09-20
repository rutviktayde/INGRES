import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import JalSathiChat from "./pages/JalSathiChat";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<JalSathiChat />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
