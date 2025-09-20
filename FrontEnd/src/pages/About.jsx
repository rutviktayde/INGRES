import React from 'react';

function About() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <header style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderBottom: '4px solid #2196f3',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
          }}>
            <div style={{
              fontSize: '1.5rem'
            }}>💧</div>
          </div>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1976d2, #00acc1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.25rem'
            }}>About Jal Sathi</h1>
            <p style={{
              color: '#666',
              fontSize: '0.875rem'
            }}>Your Groundwater Management Assistant</p>
          </div>
        </div>
      </header>
      
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 50%, #e0f7fa 100%)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '3rem'
        }}>
          <div style={{
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#333',
              marginBottom: '1.5rem'
            }}>Welcome to Jal Sathi!</h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#666'
            }}>
              Jal Sathi is an AI-powered chatbot designed to assist farmers, individuals, and resource managers in effectively managing groundwater resources. 
              Our mission is to provide accessible and accurate information to promote sustainable water usage and enhance agricultural productivity.
            </p>
          </div>

          <div style={{
            marginBottom: '3rem'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '2rem'
            }}>What Jal Sathi Can Do For You</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>📊</div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>Real-time Data</h4>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>Get real-time information on groundwater levels and quality</p>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>🌱</div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>Smart Irrigation</h4>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>Receive personalized recommendations for irrigation based on crop type and soil conditions</p>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>💡</div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>Conservation Tips</h4>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>Learn about efficient water conservation techniques</p>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>📈</div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>Data Insights</h4>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>Access data-driven insights for resource planning and management</p>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>👥</div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>Expert Support</h4>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>Connect with experts for further assistance and guidance</p>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e3f2fd'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  display: 'block'
                }}>🎯</div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#333'
                }}>Smart Planning</h4>
                <p style={{
                  color: '#666',
                  lineHeight: 1.6
                }}>Get recommendations for sustainable water resource management</p>
              </div>
            </div>
          </div>

          <div style={{
            marginBottom: '3rem'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '1.5rem'
            }}>Our Mission</h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#666'
            }}>
              Our goal is to empower communities with the knowledge and tools needed to make informed decisions about their water resources, 
              ensuring a sustainable future for all. We believe that access to accurate groundwater information should be available to everyone, 
              from small-scale farmers to large agricultural enterprises.
            </p>
          </div>

          <div style={{
            marginBottom: '3rem'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '1.5rem'
            }}>Our Vision</h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#666'
            }}>
              To be the leading digital assistant for groundwater management, fostering water security and agricultural prosperity across regions. 
              We envision a future where every farmer and water manager has access to intelligent, data-driven insights for sustainable water resource management.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '1.5rem'
            }}>Contact Us</h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#666'
            }}>
              For more information or support, please contact us at <strong>support@jalsathi.com</strong> or visit our website for additional resources and updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
