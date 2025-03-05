import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer links grouped by category
  const footerLinks = {
    products: [
      { name: 'Berry Fresh', url: '#' },
      { name: 'Apple Shield', url: '#' },
      { name: 'Coming Soon', url: '#' },
      { name: 'Custom Solutions', url: '#' }
    ],
    company: [
      { name: 'About Us', url: '#about' },
      { name: 'Our Team', url: '#team' },
      { name: 'Careers', url: '#' },
      { name: 'Contact', url: '#contact' }
    ],
    resources: [
      { name: 'Documentation', url: '#' },
      { name: 'FDA Compliance', url: '#' },
      { name: 'Application Guidelines', url: '#' },
      { name: 'Research', url: '#' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-branding">
            <h3 className="footer-logo">
              Span<span className="text-accent">ex</span>
              <span className="text-secondary">Sciences</span>
            </h3>
            <p className="footer-tagline">
              Revolutionizing preservation technology with GRAS-certified, organic-compliant formulations.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="footer-links-container">
            <div className="footer-links-column">
              <h4 className="footer-links-title">Products</h4>
              <ul className="footer-links">
                {footerLinks.products.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <a href={link.url} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-links-title">Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <a href={link.url} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-links-title">Resources</h4>
              <ul className="footer-links">
                {footerLinks.resources.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <a href={link.url} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Spanex Sciences. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;