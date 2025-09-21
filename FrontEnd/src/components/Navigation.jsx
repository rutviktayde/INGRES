import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: "" },
    { path: "/chat", label: "Chat", icon: "" },
    { path: "/about", label: "About", icon: "" },
    { path: "/contact", label: "Contact", icon: "" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="logo-icon">💧</div>
          <span className="logo-text">Jal Sathi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <Link to="/login" className="auth-link login-link">
            Login
          </Link>
          <Link to="/register" className="auth-link register-link">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-button ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${
                isActive(item.path) ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              <span className="mobile-nav-label">{item.label}</span>
            </Link>
          ))}

          <div className="mobile-auth">
            <Link to="/login" className="mobile-auth-link" onClick={closeMenu}>
              Login
            </Link>
            <Link
              to="/register"
              className="mobile-auth-link"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
