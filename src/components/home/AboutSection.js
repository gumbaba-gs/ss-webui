import React, { useState, useEffect, useRef } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Toggle feature expansion
  const toggleFeature = (id) => {
    if (expandedFeature === id) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(id);
    }
  };
  
  // Set up intersection observer for animation on scroll
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
  
  // Core offerings data
  const coreOfferings = [
    { 
      id: 'preservation', 
      title: 'Produce Preservation', 
      icon: '🍎',
      description: 'Extending shelf life of fruits, vegetables and flowers',
      details: [
        'Extends shelf life by 3-5x for various produce types',
        'Maintains original taste, texture, and nutritional profile',
        'Reduces waste throughout the supply chain',
        'Works with both organic and conventional produce'
      ]
    },
    { 
      id: 'global', 
      title: 'Globally Approved Formulations', 
      icon: '🌐',
      description: 'FDA-compliant, safe ingredients',
      details: [
        'GRAS (Generally Recognized As Safe) ingredients',
        'Complies with FDA, EU, and global regulatory standards',
        'Transparent ingredient disclosure',
        'Extensive safety testing and documentation'
      ]
    },
    { 
      id: 'organic', 
      title: 'Organic Solutions', 
      icon: '🌱',
      description: 'Organic-certified preservation options',
      details: [
        'USDA and EU organic certified formulations',
        'Plant-based, food-derived ingredients',
        'No synthetic chemicals or preservatives',
        'Compatible with organic farming practices'
      ]
    },
    { 
      id: 'tailored', 
      title: 'Tailored Solutions', 
      icon: '🧪',
      description: 'Custom formulations for specific regions & climates',
      details: [
        'Region-specific formulations for local produce varieties',
        'Climate-adapted solutions for varying humidity and temperature',
        'Custom blends for specific post-harvest challenges',
        'Specialized solutions for supply chain optimization'
      ]
    },
    { 
      id: 'safety', 
      title: 'Food Safety & Freshness Wash', 
      icon: '🧼',
      description: 'Remove contaminants while preserving shelf life',
      details: [
        'Removes pesticides, pathogens, and contaminants',
        'Combined cleaning and preservation in one application',
        'Reduces cross-contamination risk',
        'Enhances food safety metrics while extending freshness'
      ]
    }
  ];

  return (
    <section className="about-section" id="about">
      {/* Section header outside the main container */}
      <div className="about-section__header">
        <h2 className="about-section__title">About Spanex Sciences</h2>
        <p className="about-section__subtitle">
          Pioneering scientific solutions for food preservation and human health
        </p>
      </div>
      
      <div 
        ref={sectionRef}
        className={`about-section__container ${isVisible ? 'visible' : ''}`}
      >
        <div className="about-section__content-card">
          <div className="about-section__content">
            <p className="about-section__text">
              Spanex Sciences is a <span className="about-section__highlight">pioneering scientific company</span> with over <span className="about-section__highlight">100 innovative formulations</span>, spanning both <span className="about-section__highlight--secondary">organic and non-organic solutions</span>. Our <span className="about-section__highlight--accent">proprietary technologies</span> are transforming multiple industries by enhancing <span className="about-section__highlight">preservation, sustainability, and human health</span>.
            </p>
            
            <p className="about-section__text">
              Our <span className="about-section__highlight">breakthrough preservation methods</span> extend the <span className="about-section__highlight">shelf life</span> of fruits, vegetables, and flowers—while maintaining their <span className="about-section__highlight--secondary">natural taste, appearance, and nutritional value</span>.
            </p>
            
            <p className="about-section__text">
              Beyond food preservation, we are at the forefront of <span className="about-section__highlight">human and animal health innovations</span>, including <span className="about-section__highlight--secondary">lifespan-enhancing superfoods</span>, <span className="about-section__highlight--success">eco-friendly waterless hygiene products</span>, and <span className="about-section__highlight--accent">advanced produce and meat wash solutions</span> that ensure <span className="about-section__highlight">safety, freshness, and compliance with global food safety standards</span>.
            </p>
            
            {/* Tabs navigation */}
            <div className="about-section__tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`about-section__tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              >
                Company Overview
              </button>
              <button
                onClick={() => setActiveTab('offerings')}
                className={`about-section__tab-button ${activeTab === 'offerings' ? 'active' : ''}`}
              >
                Core Offerings
              </button>
            </div>
            
            {/* Tab content container */}
            <div className="about-section__tab-content">
              {activeTab === 'overview' && (
                <div className="about-section__overview">
                  <div className="about-section__overview-content">
                    <h3 className="about-section__overview-title">Our Scientific Approach</h3>
                    <p className="about-section__overview-text">
                      At Spanex Sciences, we combine cutting-edge research with practical applications to create solutions that address real-world challenges in food preservation and human health.
                    </p>
                    <p className="about-section__overview-text">
                      Our team of scientists and food technology experts work together to develop formulations that are not only effective but also safe, sustainable, and compliant with global regulations.
                    </p>
                    
                    <div className="about-section__metrics-grid">
                      <div className="about-section__metric-card">
                        <div className="about-section__metric-value">100+</div>
                        <p className="about-section__metric-label">Formulations</p>
                      </div>
                      
                      <div className="about-section__metric-card">
                        <div className="about-section__metric-value">3-5×</div>
                        <p className="about-section__metric-label">Shelf Life Extension</p>
                      </div>
                      
                      <div className="about-section__metric-card">
                        <div className="about-section__metric-value">75%</div>
                        <p className="about-section__metric-label">Waste Reduction</p>
                      </div>
                      
                      <div className="about-section__metric-card">
                        <div className="about-section__metric-value">20+</div>
                        <p className="about-section__metric-label">Countries Served</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'offerings' && (
                <div className="about-section__offerings">
                  <h3 className="about-section__offerings-title">Our Core Offerings</h3>
                  
                  <div className="about-section__offerings-list">
                    {coreOfferings.map(offering => (
                      <div 
                        key={offering.id}
                        className={`about-section__offering ${
                          expandedFeature === offering.id ? 'about-section__offering--expanded' : ''
                        }`}
                      >
                        <div 
                          className="about-section__offering-header"
                          onClick={() => toggleFeature(offering.id)}
                        >
                          <div className="about-section__offering-icon">
                            {offering.icon}
                          </div>
                          <div className="about-section__offering-info">
                            <h4 className="about-section__offering-title">{offering.title}</h4>
                            <p className="about-section__offering-description">{offering.description}</p>
                          </div>
                          <div className="about-section__offering-toggle">
                            <svg 
                              className={`about-section__toggle-icon ${
                                expandedFeature === offering.id ? 'about-section__toggle-icon--expanded' : ''
                              }`} 
                              width="20" height="20" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                fill="currentColor" 
                                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                              />
                            </svg>
                          </div>
                        </div>
                        
                        {expandedFeature === offering.id && (
                          <div className="about-section__offering-details">
                            <ul className="about-section__details-list">
                              {offering.details.map((detail, index) => (
                                <li key={index} className="about-section__details-item">{detail}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Indicator bars */}
        <div className="about-section__indicator-bars">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`about-section__indicator-bar ${index < 5 ? 'about-section__indicator-bar--active' : ''}`}
            ></div>
          ))}
        </div>
        
        {/* CTA/Footnote section */}
        <div className="about-section__footnote">
          <p className="about-section__footnote-text">
            Ready to explore how our innovative solutions can help your business reduce waste, enhance product quality, and improve sustainability?
          </p>
          
          <a href="#contact" className="about-section__cta">
            Contact Our Team
          </a>
          
          {/* Secondary indicator bars */}
          <div className="about-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`about-section__indicator-bar ${index < 5 ? 'about-section__indicator-bar--active' : ''}`}
              ></div>
            ))}
          </div>
          
          <p className="about-section__counter-message">
            With Spanex technology, we can reduce food waste by up to 75%.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;