import React, { useEffect } from 'react';
import './App.css';
import './responsive.css'; // Import the new responsive styles

// Import Components
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import FoodWasteCounter from './components/home/FoodWasteCounter';
import AboutSection from './components/home/AboutSection';
import TechnologySection from './components/home/TechnologySection';
import BeforeAfterComparison from './components/home/BeforeAfterComparison';
import ComparisonSection from './components/home/ComparisonSection';
import SustainabilitySection from './components/home/SustainabilitySection';
import TeamSection from './components/home/TeamSection';
import ProductSection from './components/home/ProductSection';
import ContactSection from './components/home/ContactSection';
import Footer from './components/layout/Footer';

import { ThemeProvider } from './context/ThemeContext/ThemeContext';

function App() {
  useEffect(() => {
    // Add Font Awesome
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Add viewport meta tag to ensure proper scaling on mobile devices
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(metaViewport);

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      e.preventDefault();
      const targetId = target.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Detect touch devices and add class to body
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('touch-device');
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.body.removeChild(script);
      document.head.removeChild(metaViewport);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App font-sans bg-surface text-text">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <FoodWasteCounter />
          <TechnologySection />
          <BeforeAfterComparison />
          <ComparisonSection />
          {/* <SustainabilitySection /> */}
          <ProductSection />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;