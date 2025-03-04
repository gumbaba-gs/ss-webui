import React, { useEffect } from 'react';
import './App.css';

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
import ProductsSection from './components/home/ProductsSection';
import ContactSection from './components/home/ContactSection';
import Footer from './components/layout/Footer';

function App() {
  useEffect(() => {
    // Add Font Awesome
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      e.preventDefault();
      const targetId = target.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App font-sans bg-gray-50">
      <Navbar />
      <HeroSection />
      <FoodWasteCounter />
      <AboutSection />
      <TechnologySection />
      <BeforeAfterComparison />
      <ComparisonSection />
      <SustainabilitySection />
      <ProductsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;