import React, { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'berry',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset form status
    setFormStatus({
      submitted: true,
      success: false,
      error: false,
      message: 'Sending your message...'
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Here you would typically send the data to your backend
      console.log('Form submitted with data:', formData);
      
      // Simulate success
      setFormStatus({
        submitted: true,
        success: true,
        error: false,
        message: 'Thanks for your message! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        interest: 'berry',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          error: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in our products or partnership opportunities? Contact us today.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h4 className="contact-label">Address</h4>
                <p className="contact-value">123 Innovation Drive, Tech Park, CA 94105</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h4 className="contact-label">Email</h4>
                <p className="contact-value">info@spanexsciences.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-text">
                <h4 className="contact-label">Phone</h4>
                <p className="contact-value">+1 (555) 123-4567</p>
              </div>
            </div>

            <h3 className="social-title">Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon youtube" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-icon email" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <h3 className="form-title">Send Us a Message</h3>

            {formStatus.submitted && (
              <div className={`form-message ${formStatus.success ? 'success' : formStatus.error ? 'error' : 'sending'}`}>
                {formStatus.message}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={formStatus.submitted}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-input"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={formStatus.submitted}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="form-input"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={formStatus.submitted}
                />
              </div>

              <div className="form-group">
                <label htmlFor="interest" className="form-label">I'm interested in:</label>
                <select 
                  id="interest" 
                  className="form-select"
                  value={formData.interest}
                  onChange={handleChange}
                  disabled={formStatus.submitted}
                >
                  <option value="berry">Berry Preservation</option>
                  <option value="apple">Apple Preservation</option>
                  <option value="custom">Custom Formulation</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  id="message" 
                  className="form-textarea"
                  rows="4" 
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={formStatus.submitted}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="form-submit"
                disabled={formStatus.submitted}
              >
                {formStatus.submitted ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;