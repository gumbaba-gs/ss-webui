import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle clicks outside mobile menu and escape key
  useEffect(() => {
    // Handle clicks outside mobile menu to close it
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    // Handle escape key to close mobile menu
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobileMenuOpen]);

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  };

  // Open mobile menu
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.classList.add('menu-open');
    
    // Set focus on the mobile menu for accessibility
    if (mobileMenuRef.current) {
      setTimeout(() => {
        const firstFocusableElement = mobileMenuRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }, 300);
    }
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
    
    // Return focus to hamburger button for accessibility
    if (hamburgerRef.current) {
      hamburgerRef.current.focus();
    }
  };

  // Navigation items
  const navItems = [
    { href: "#about", text: "About" },
    { href: "#products", text: "Products" },
    { href: "#technology", text: "Technology" },
    { href: "#team", text: "Team" },
    { href: "#contact", text: "Contact" }
  ];

  // Social media links
  const socialLinks = [
    { href: "#", icon: "fa-linkedin-in", label: "LinkedIn" },
    { href: "#", icon: "fa-twitter", label: "Twitter" },
    { href: "#contact", icon: "fa-envelope", label: "Contact us" }
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="Spanex Sciences Homepage">
          <span className="navbar__logo-text">
            Span<span className="navbar__logo-accent">ex</span>{' '}
            <span className="navbar__logo-secondary">Sciences</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar__desktop-nav" aria-label="Main Navigation">
          <ul className="navbar__nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="navbar__nav-item">
                <a href={item.href} className="navbar__nav-link">{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={hamburgerRef}
          className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--active' : ''}`}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="navbar__mobile-content">
          <div className="navbar__mobile-header">
            <span className="navbar__logo-text">
              Span<span className="navbar__logo-accent">ex</span>{' '}
              <span className="navbar__logo-secondary">Sciences</span>
            </span>
            <button
              className="navbar__mobile-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="navbar__mobile-nav" aria-label="Mobile Navigation">
            <ul className="navbar__mobile-list">
              {navItems.map((item, index) => (
                <li key={index} className="navbar__mobile-item">
                  <a 
                    href={item.href} 
                    className="navbar__mobile-link"
                    onClick={closeMobileMenu}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__mobile-footer">
            <div className="navbar__social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="navbar__social-link"
                  onClick={link.href === "#contact" ? closeMobileMenu : undefined}
                >
                  <i className={`fab ${link.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`navbar__overlay ${isMobileMenuOpen ? 'navbar__overlay--active' : ''}`} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      ></div>
    </header>
  );
};

export default Navbar;