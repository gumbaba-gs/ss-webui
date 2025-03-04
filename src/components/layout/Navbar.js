import React, { useState, useEffect } from 'react';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`bg-surface text-text py-4 px-6 ${isScrolled ? 'scrolled' : ''} fixed w-full z-50 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold logo-text text-text">
              Span<span className="text-accent">ex</span>{' '}
              <span className="text-secondary">Sciences</span>
            </span>
          </a>

          <div className="hidden md:flex space-x-8">
            <a href="#about" className="nav-link">About</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#technology" className="nav-link">Technology</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <button
            className="md:hidden text-text focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-bold text-text">
              Span<span className="text-accent">ex</span>{' '}
              <span className="text-secondary">Sciences</span>
            </span>
            <button
              className="focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <a href="#about" className="py-2 px-4 hover:bg-surface rounded-lg text-text" onClick={toggleMobileMenu}>About</a>
            <a href="#products" className="py-2 px-4 hover:bg-surface rounded-lg text-text" onClick={toggleMobileMenu}>Products</a>
            <a href="#technology" className="py-2 px-4 hover:bg-surface rounded-lg text-text" onClick={toggleMobileMenu}>Technology</a>
            <a href="#team" className="py-2 px-4 hover:bg-surface rounded-lg text-text" onClick={toggleMobileMenu}>Team</a>
            <a href="#contact" className="py-2 px-4 hover:bg-surface rounded-lg text-text" onClick={toggleMobileMenu}>Contact</a>
          </div>
        </div>
      </div>
      <div 
        className={`menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
      ></div>
    </>
  );
};

export default Navbar;