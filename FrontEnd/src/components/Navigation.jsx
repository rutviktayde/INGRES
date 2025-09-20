import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/chat', label: 'Chat', icon: '💬' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📞' }
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
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(33, 150, 243, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: '#333',
          fontWeight: 700,
          fontSize: '1.5rem',
          transition: 'all 0.3s ease'
        }} onClick={closeMenu}>
          <div style={{
            fontSize: '2rem',
            animation: 'float 3s ease-in-out infinite'
          }}>💧</div>
          <span style={{
            background: 'linear-gradient(135deg, #1976d2, #00acc1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Jal Sathi</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                textDecoration: 'none',
                color: isActive(item.path) ? '#2196f3' : '#666',
                fontWeight: isActive(item.path) ? 600 : 500,
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                position: 'relative',
                background: isActive(item.path) ? 'rgba(33, 150, 243, 0.1)' : 'transparent'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Link to="/login" style={{
            padding: '0.5rem 1.5rem',
            textDecoration: 'none',
            borderRadius: '2rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            color: '#666',
            border: '2px solid transparent'
          }}>
            Login
          </Link>
          <Link to="/register" style={{
            padding: '0.5rem 1.5rem',
            textDecoration: 'none',
            borderRadius: '2rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
          }}>
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '30px',
            height: '30px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            zIndex: 1001
          }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span style={{
            width: '100%',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transformOrigin: 'center',
            transform: isMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
          }}></span>
          <span style={{
            width: '100%',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transformOrigin: 'center',
            opacity: isMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            width: '100%',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transformOrigin: 'center',
            transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
          }}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div style={{
        position: 'fixed',
        top: '70px',
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(33, 150, 243, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        zIndex: 999
      }}>
        <div style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                textDecoration: 'none',
                color: isActive(item.path) ? '#2196f3' : '#666',
                fontWeight: isActive(item.path) ? 600 : 500,
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                background: isActive(item.path) ? 'rgba(33, 150, 243, 0.1)' : 'transparent'
              }}
              onClick={closeMenu}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span style={{ fontSize: '1rem' }}>{item.label}</span>
            </Link>
          ))}
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e0e0e0'
          }}>
            <Link to="/login" style={{
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontWeight: 600,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              color: '#666',
              border: '2px solid #e0e0e0'
            }} onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontWeight: 600,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
            }} onClick={closeMenu}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
