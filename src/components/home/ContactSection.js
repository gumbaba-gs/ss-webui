import React, { useState, useRef, useEffect } from 'react';
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

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Setup intersection observer to animate in when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
      {/* Section header moved outside the main container */}
      <div className="section-header">
        <h2 className="section-title">Contact Our Team</h2>
        <p className="section-subtitle">
          Reach out for technical inquiries, partnership opportunities, or product information
        </p>
      </div>
      
      <div className="container">
        <div ref={sectionRef} className={`content-container contact-container ${isVisible ? 'fade-in-up visible' : ''}`}>
          {/* Responsive grid layout */}
          <div className="contact-card">
            <div className="contact-info">
              <h3 className="card-title">Contact Information</h3>

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

              <div className="contact-social-wrapper">
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
            </div>

            <div className="contact-form-container">
              <h3 className="card-title">Send Us a Message</h3>

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
                  className="btn-primary form-submit"
                  disabled={formStatus.submitted}
                >
                  {formStatus.submitted ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Improved CTA Section */}
          <div className="cta-card">
            <p className="cta-text">
              Need urgent assistance? Schedule a call with our product specialists.
            </p>
            
            <a href="#" className="btn-primary cta-button">
              Schedule a Consultation
            </a>
            
            <div className="counter-bars">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className={`counter-bar ${index < 5 ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;