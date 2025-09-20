import React, { useState } from 'react';
import './Contact.css';

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
      <div className="contact-container">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="btn btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      {/* Header Section */}
      <section className="contact-header">
        <div className="header-content">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Get in touch with our team for support, questions, or feedback about Jal Sathi
          </p>
        </div>
      </section>

      <div className="contact-content">
        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-container">
            <h2 className="section-title">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="Enter message subject"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Enter your message here..."
                  rows="5"
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
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
        <section className="contact-info-section">
          <div className="info-container">
            <h2 className="section-title">Get in Touch</h2>
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">{info.icon}</div>
                  <h3 className="contact-title">{info.title}</h3>
                  <p className="contact-details">{info.details}</p>
                  <p className="contact-description">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="faq-container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
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
