import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, handle login success/error
      console.log('Login attempt:', formData);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 50%, #e0f7fa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              fontSize: '2.5rem',
              animation: 'float 3s ease-in-out infinite'
            }}>💧</div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1976d2, #00acc1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>Jal Sathi</h1>
          </div>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            margin: 0
          }}>Sign in to access groundwater data</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          marginBottom: '2rem'
        }}>
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <label htmlFor="email" style={{
              display: 'block',
              fontWeight: 600,
              color: '#333',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: `2px solid ${errors.email ? '#f44336' : '#e3f2fd'}`,
                borderRadius: '0.75rem',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: errors.email ? '#ffebee' : '#f8f9fa'
              }}
              placeholder="Enter your email"
            />
            {errors.email && <span style={{
              color: '#f44336',
              fontSize: '0.8rem',
              marginTop: '0.25rem',
              display: 'block'
            }}>{errors.email}</span>}
          </div>

          <div style={{
            marginBottom: '1.5rem'
          }}>
            <label htmlFor="password" style={{
              display: 'block',
              fontWeight: 600,
              color: '#333',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: `2px solid ${errors.password ? '#f44336' : '#e3f2fd'}`,
                borderRadius: '0.75rem',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: errors.password ? '#ffebee' : '#f8f9fa'
              }}
              placeholder="Enter your password"
            />
            {errors.password && <span style={{
              color: '#f44336',
              fontSize: '0.8rem',
              marginTop: '0.25rem',
              display: 'block'
            }}>{errors.password}</span>}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#2196f3'
                }}
              />
              <span style={{
                userSelect: 'none'
              }}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={{
              color: '#2196f3',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.3s ease'
            }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isLoading ? 0.7 : 1
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center'
        }}>
          <p style={{
            color: '#666',
            fontSize: '0.9rem',
            marginBottom: '1.5rem'
          }}>
            Don't have an account? 
            <Link to="/register" style={{
              color: '#2196f3',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.3s ease'
            }}> Sign up here</Link>
          </p>
          
          <div style={{
            position: 'relative',
            margin: '1.5rem 0',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: '#e0e0e0'
            }}></div>
            <span style={{
              background: 'white',
              padding: '0 1rem',
              color: '#999',
              fontSize: '0.9rem',
              position: 'relative',
              zIndex: 1
            }}>or</span>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '0.875rem',
              border: '2px solid #e3f2fd',
              borderRadius: '0.75rem',
              background: 'white',
              color: '#333',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <span style={{
                fontSize: '1.2rem'
              }}>🔍</span>
              Continue with Google
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '0.875rem',
              border: '2px solid #e3f2fd',
              borderRadius: '0.75rem',
              background: 'white',
              color: '#333',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <span style={{
                fontSize: '1.2rem'
              }}>🏢</span>
              Continue with Microsoft
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e0e0e0'
        }}>
          <Link to="/chat" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.3s ease'
          }}>
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
