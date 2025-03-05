import React, { useState } from 'react';
import './AboutSection.css';
// Import placeholder image - replace with actual image when available
// import labImage from '../../images/lab.jpg';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState(null);
  
  const toggleFeature = (id) => {
    if (expandedFeature === id) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(id);
    }
  };
  
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
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Spanex Sciences</h2>
          <p className="section-subtitle">
            Pioneering scientific solutions for food preservation and human health
          </p>
        </div>
        
        <div className="about-container">
          <div className="about-content">
            <p className="about-text">
              Spanex Sciences is a <span className="highlight">pioneering scientific company</span> with over <span className="highlight">100 innovative formulations</span>, spanning both <span className="highlight-secondary">organic and non-organic solutions</span>. Our <span className="highlight-accent">proprietary technologies</span> are transforming multiple industries by enhancing <span className="highlight">preservation, sustainability, and human health</span>.
            </p>
            
            <p className="about-text">
              Our <span className="highlight">breakthrough preservation methods</span> extend the <span className="highlight">shelf life</span> of fruits, vegetables, and flowers—while maintaining their <span className="highlight-secondary">natural taste, appearance, and nutritional value</span>.
            </p>
            
            <p className="about-text">
              Beyond food preservation, we are at the forefront of <span className="highlight">human and animal health innovations</span>, including <span className="highlight-secondary">lifespan-enhancing superfoods</span>, <span className="highlight-success">eco-friendly waterless hygiene products</span>, and <span className="highlight-accent">advanced produce and meat wash solutions</span> that ensure <span className="highlight">safety, freshness, and compliance with global food safety standards</span>.
            </p>
            
            <div className="about-tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              >
                Company Overview
              </button>
              <button
                onClick={() => setActiveTab('offerings')}
                className={`tab-button ${activeTab === 'offerings' ? 'active' : ''}`}
              >
                Core Offerings
              </button>
            </div>
            
            <div className="tab-content-container">
              {activeTab === 'overview' && (
                <div className="tab-content">
                  <div className="overview-content">
                    <div className="overview-image">
                      <img
                        src="https://placehold.co/600x400/1a5e63/ffffff?text=Lab+Research"
                        alt="Lab research"
                        className="lab-image"
                      />
                    </div>
                    
                    <div className="overview-text">
                      <h3 className="overview-title">Our Scientific Approach</h3>
                      <p>
                        At Spanex Sciences, we combine cutting-edge research with practical applications to create solutions that address real-world challenges in food preservation and human health.
                      </p>
                      <p>
                        Our team of scientists and food technology experts work together to develop formulations that are not only effective but also safe, sustainable, and compliant with global regulations.
                      </p>
                      
                      <div className="metrics-grid">
                        <div className="metric-card">
                          <div className="metric-value">100+</div>
                          <p className="metric-label">Formulations</p>
                        </div>
                        
                        <div className="metric-card">
                          <div className="metric-value">3-5×</div>
                          <p className="metric-label">Shelf Life Extension</p>
                        </div>
                        
                        <div className="metric-card">
                          <div className="metric-value">75%</div>
                          <p className="metric-label">Waste Reduction</p>
                        </div>
                        
                        <div className="metric-card">
                          <div className="metric-value">20+</div>
                          <p className="metric-label">Countries Served</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'offerings' && (
                <div className="tab-content">
                  <h3 className="offerings-title">Our Core Offerings</h3>
                  
                  <div className="offerings-list">
                    {coreOfferings.map(offering => (
                      <div 
                        key={offering.id}
                        className={`offering-item ${expandedFeature === offering.id ? 'expanded' : ''}`}
                      >
                        <div 
                          className="offering-header"
                          onClick={() => toggleFeature(offering.id)}
                        >
                          <div className="offering-icon">
                            {offering.icon}
                          </div>
                          <div className="offering-title-container">
                            <h4 className="offering-title">{offering.title}</h4>
                            <p className="offering-description">{offering.description}</p>
                          </div>
                          <div className="offering-toggle">
                            <svg 
                              className={`toggle-icon ${expandedFeature === offering.id ? 'expanded' : ''}`} 
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
                          <div className="offering-details">
                            <ul className="details-list">
                              {offering.details.map((detail, index) => (
                                <li key={index} className="detail-item">{detail}</li>
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
        
        <div className="counter-bars">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`counter-bar ${index < 5 ? 'active' : ''}`}
            ></div>
          ))}
        </div>
        
        <p className="counter-message">
          With Spanex technology, we can reduce food waste by up to 75%.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;