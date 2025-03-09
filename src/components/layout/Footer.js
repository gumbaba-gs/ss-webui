import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer links grouped by category
  const footerLinks = {
    products: [
      { name: 'Berry Fresh', url: '#products' },
      { name: 'Apple Shield', url: '#products' },
      { name: 'Coming Soon', url: '#products' },
      { name: 'Custom Solutions', url: '#contact' }
    ],
    company: [
      { name: 'About Us', url: '#about' },
      { name: 'Our Team', url: '#team' },
      { name: 'Careers', url: '#contact' },
      { name: 'Contact', url: '#contact' }
    ],
    resources: [
      { 
        name: 'Documentation', 
        url: '#documentation',
        sublinks: [
          { name: 'Product Data Sheets', url: '#data-sheets' },
          { name: 'Safety Information', url: '#safety' },
          { name: 'Technical Guides', url: '#guides' },
          { name: 'Implementation Manuals', url: '#manuals' }
        ]
      },
      { 
        name: 'FDA Compliance', 
        url: '#fda-compliance',
        sublinks: [
          { name: 'GRAS Status Documents', url: '#gras-status' },
          { name: 'Regulatory Information', url: '#regulatory' },
          { name: 'Food Safety Certifications', url: '#certifications' },
          { name: 'Compliance Statements', url: '#compliance' }
        ]
      },
      { 
        name: 'Application Guidelines', 
        url: '#application-guidelines',
        sublinks: [
          { name: 'Spray Application Guide', url: '#spray-guide' },
          { name: 'Dipping Procedures', url: '#dipping' },
          { name: 'Dosage Calculator', url: '#calculator' },
          { name: 'Storage Requirements', url: '#storage' }
        ]
      },
      { 
        name: 'Research', 
        url: '#research',
        sublinks: [
          { name: 'Efficacy Studies', url: '#efficacy' },
          { name: 'White Papers', url: '#white-papers' },
          { name: 'Case Studies', url: '#case-studies' },
          { name: 'Academic Collaborations', url: '#academic' }
        ]
      }
    ]
  };

  // This function generates a dropdown menu of sublinks when a resource link is clicked
  const handleResourceClick = (e, link) => {
    if (link.sublinks) {
      e.preventDefault();
      // Toggle visibility of dropdown
      const dropdown = e.currentTarget.nextElementSibling;
      if (dropdown) {
        dropdown.classList.toggle('active');
      }
    }
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

            <div className="footer-links-column resources-column">
              <h4 className="footer-links-title">Resources</h4>
              <ul className="footer-links">
                {footerLinks.resources.map((link, index) => (
                  <li key={index} className="footer-link-item resource-link-item">
                    <a 
                      href={link.url} 
                      className="footer-link resource-link"
                      onClick={(e) => handleResourceClick(e, link)}
                    >
                      {link.name}
                      {link.sublinks && <i className="fas fa-chevron-down footer-dropdown-icon"></i>}
                    </a>
                    
                    {link.sublinks && (
                      <ul className="footer-sublinks">
                        {link.sublinks.map((sublink, subIndex) => (
                          <li key={subIndex} className="footer-sublink-item">
                            <a href={sublink.url} className="footer-sublink">
                              {sublink.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
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