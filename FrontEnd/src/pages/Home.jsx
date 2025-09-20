import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: '💬',
      title: 'Chat Share Functionality',
      description: 'Share specific chatbot conversations or insights with colleagues and stakeholders for collaborative decision-making.'
    },
    {
      icon: '🗣️',
      title: 'Plain Language Queries',
      description: 'Ask groundwater-related questions in natural language without technical expertise required.'
    },
    {
      icon: '🔗',
      title: 'Direct INGRES Integration',
      description: 'Fetches authoritative data directly from the official groundwater database (India Ground Water Resource Estimation System).'
    },
    {
      icon: '🌐',
      title: 'Multilingual Support',
      description: 'Supports English and Indian regional languages for wider accessibility across diverse user groups.'
    },
    {
      icon: '📊',
      title: 'Graph & Analysis Output',
      description: 'Generates charts, maps, and visual insights directly within the chat interface.'
    },
    {
      icon: '📥',
      title: 'Export Charts & Visuals',
      description: 'Download generated visuals for reporting and presentations.'
    },
    {
      icon: '⚡',
      title: 'Low Latency Responses',
      description: 'Smart caching and optimized pipeline ensure instant query results.'
    },
    {
      icon: '💾',
      title: 'Browser Data Caching',
      description: 'Reduces redundant requests and improves overall performance.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Assessment Units' },
    { number: '50+', label: 'Regional Languages' },
    { number: '99.9%', label: 'Uptime' },
    { number: '<1s', label: 'Response Time' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 50%, #e0f7fa 100%)',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            animation: 'slideInLeft 0.8s ease-out'
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Welcome to <span style={{
                background: 'linear-gradient(45deg, #ffeb3b, #ffc107)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Jal Sathi</span>
            </h1>
            <p style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              opacity: 0.9,
              fontWeight: 300
            }}>
              Your AI-powered groundwater management assistant powered by INGRES data
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              opacity: 0.9
            }}>
              Access real-time groundwater data, historical assessments, and intelligent insights 
              through our conversational AI interface. Built for planners, researchers, policymakers, 
              and the general public.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link to="/chat" style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
              }}>
                Start Chatting
              </Link>
              <Link to="/about" style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                background: 'transparent',
                color: '#2196f3',
                borderColor: '#2196f3'
              }}>
                Learn More
              </Link>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'slideInRight 0.8s ease-out'
          }}>
            <div style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '4rem',
                animation: 'float 3s ease-in-out infinite',
                zIndex: 2,
                position: 'relative'
              }}>💧</div>
              <div style={{
                position: 'absolute',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                animation: 'ripple 2s infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                animation: 'ripple 2s infinite',
                animationDelay: '0.5s'
              }}></div>
              <div style={{
                position: 'absolute',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                animation: 'ripple 2s infinite',
                animationDelay: '1s'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '3rem 2rem',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderRadius: '1rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#2196f3',
                marginBottom: '0.5rem'
              }}>{stat.number}</div>
              <div style={{
                fontSize: '1rem',
                color: '#666',
                fontWeight: 500
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#333'
          }}>Key Features</h2>
          <p style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            color: '#666',
            marginBottom: '3rem'
          }}>
            Powered by the official INGRES database and advanced AI technology
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGRES Integration Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #1976d2 0%, #00acc1 100%)',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: 'white'
            }}>Direct INGRES Integration</h2>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Our AI chatbot is directly integrated with the <strong>India Ground Water Resource Estimation System (INGRES)</strong>, 
              developed by CGWB and IIT Hyderabad. This ensures you get authoritative, real-time data from the official 
              groundwater database.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>✅</span>
                <span>Real-time access to current and historical assessment results</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>✅</span>
                <span>Interactive scientific diagrams and visualizations</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>✅</span>
                <span>Seamless integration for quick information retrieval</span>
              </div>
            </div>
            <div style={{
              marginTop: '2rem'
            }}>
              <a href="https://ingres.iith.ac.in/home" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                background: 'transparent',
                color: 'white',
                borderColor: 'white'
              }}>
                Visit INGRES Portal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#333'
          }}>Ready to Explore Groundwater Data?</h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Start your conversation with Jal Sathi and discover insights about groundwater resources in your area.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/chat" style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              border: '2px solid transparent',
              cursor: 'pointer',
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
            }}>
              Get Started Now
            </Link>
            <Link to="/contact" style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              border: '2px solid transparent',
              cursor: 'pointer',
              fontSize: '1.1rem',
              background: 'transparent',
              color: '#2196f3',
              borderColor: '#2196f3'
            }}>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
