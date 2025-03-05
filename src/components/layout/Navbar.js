import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from '../common/ThemeToggle';
import './Navbar.css'; // We'll create this file for navbar-specific styles

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Handle clicks outside mobile menu to close it
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    // Handle escape key to close mobile menu
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Toggle body scroll lock when menu is open
    if (!isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Menu items to keep them DRY
  const menuItems = [
    { href: "#about", text: "About" },
    { href: "#products", text: "Products" },
    { href: "#technology", text: "Technology" },
    { href: "#team", text: "Team" },
    { href: "#contact", text: "Contact" }
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <a href="#" className="logo" aria-label="Spanex Sciences Homepage">
            <span className="logo-text">
              Span<span className="text-accent">ex</span>{' '}
              <span className="text-secondary">Sciences</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a href={item.href} className="nav-link">{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={hamburgerRef}
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <span className="logo-text">
              Span<span className="text-accent">ex</span>{' '}
              <span className="text-secondary">Sciences</span>
            </span>
            <button
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="Close mobile menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="mobile-nav">
            <ul className="mobile-nav-links">
              {menuItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  <a 
                    href={item.href} 
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <ThemeToggle />
            <div className="mobile-social-links">
              <a href="#" aria-label="LinkedIn" className="mobile-social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="Twitter" className="mobile-social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Contact us" className="mobile-social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      ></div>
    </header>
  );
};

export default Navbar;