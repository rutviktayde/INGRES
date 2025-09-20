import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'data', label: 'Data Access' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Support',
      details: 'support@jalsathi.gov.in',
      description: 'Get help with technical issues and general inquiries'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      details: '+91-11-2345-6789',
      description: 'Monday to Friday, 9 AM to 6 PM IST'
    },
    {
      icon: '🏢',
      title: 'Office Address',
      details: 'Central Ground Water Board, Faridabad',
      description: 'Ministry of Jal Shakti, Government of India'
    },
    {
      icon: '🌐',
      title: 'INGRES Portal',
      details: 'https://ingres.iith.ac.in',
      description: 'Direct access to the official groundwater database'
    }
  ];

  const faqs = [
    {
      question: 'How do I access groundwater data for my area?',
      answer: 'Simply start a conversation with Jal Sathi and ask about your specific location. The AI will fetch real-time data from the INGRES database.'
    },
    {
      question: 'Is the data provided by Jal Sathi official and reliable?',
      answer: 'Yes, all data comes directly from the official INGRES database maintained by CGWB and IIT Hyderabad, ensuring accuracy and reliability.'
    },
    {
      question: 'Can I export charts and visualizations?',
      answer: 'Absolutely! You can download any generated charts, maps, or visual insights for your reports and presentations.'
    },
    {
      question: 'Does Jal Sathi support regional languages?',
      answer: 'Yes, Jal Sathi supports multiple Indian regional languages along with English for wider accessibility.'
    },
    {
      question: 'How often is the groundwater data updated?',
      answer: 'The data is updated annually as part of the Assessment of Dynamic Ground Water Resources of India conducted by CGWB.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 50%, #e0f7fa 100%)',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
      }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            animation: 'bounce 1s ease-in-out'
          }}>✅</div>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#4caf50',
            marginBottom: '1rem'
          }}>Message Sent Successfully!</h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            style={{
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
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 50%, #e0f7fa 100%)',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    }}>
      {/* Header Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>Contact Us</h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Get in touch with our team for support, questions, or feedback about Jal Sathi
          </p>
        </div>
      </section>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* Contact Form Section */}
        <section style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '3rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#333',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <label htmlFor="name" style={{
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      padding: '0.875rem 1rem',
                      border: `2px solid ${errors.name ? '#f44336' : '#e3f2fd'}`,
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: errors.name ? '#ffebee' : '#f8f9fa',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span style={{
                    color: '#f44336',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem'
                  }}>{errors.name}</span>}
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <label htmlFor="email" style={{
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      padding: '0.875rem 1rem',
                      border: `2px solid ${errors.email ? '#f44336' : '#e3f2fd'}`,
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: errors.email ? '#ffebee' : '#f8f9fa',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span style={{
                    color: '#f44336',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem'
                  }}>{errors.email}</span>}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <label htmlFor="category" style={{
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      padding: '0.875rem 1rem',
                      border: '2px solid #e3f2fd',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: '#f8f9fa',
                      fontFamily: 'inherit'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <label htmlFor="subject" style={{
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      padding: '0.875rem 1rem',
                      border: `2px solid ${errors.subject ? '#f44336' : '#e3f2fd'}`,
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: errors.subject ? '#ffebee' : '#f8f9fa',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Enter message subject"
                  />
                  {errors.subject && <span style={{
                    color: '#f44336',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem'
                  }}>{errors.subject}</span>}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <label htmlFor="message" style={{
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    padding: '0.875rem 1rem',
                    border: `2px solid ${errors.message ? '#f44336' : '#e3f2fd'}`,
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: errors.message ? '#ffebee' : '#f8f9fa',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  placeholder="Enter your message here..."
                  rows="5"
                />
                {errors.message && <span style={{
                  color: '#f44336',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem'
                }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  alignSelf: 'center',
                  minWidth: '200px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Contact Information Section */}
        <section style={{
          marginBottom: '4rem'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#333',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>Get in Touch</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              {contactInfo.map((info, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e3f2fd'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    display: 'block'
                  }}>{info.icon}</div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>{info.title}</h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#2196f3',
                    fontWeight: 600,
                    marginBottom: '0.5rem'
                  }}>{info.details}</p>
                  <p style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    margin: 0
                  }}>{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '3rem'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#333',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>Frequently Asked Questions</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: '#f8f9fa',
                  borderRadius: '0.75rem',
                  borderLeft: '4px solid #2196f3'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.75rem'
                  }}>{faq.question}</h3>
                  <p style={{
                    color: '#666',
                    lineHeight: 1.6,
                    margin: 0
                  }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
