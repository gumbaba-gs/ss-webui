import React, { useState, useEffect, useRef } from 'react';
import './TechnologySection.css';

const TechnologySection = () => {
  // State for mechanism diagram interaction
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState({ x: 20, y: 0 });
  const [activeMechanism, setActiveMechanism] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for container elements
  const containerRef = useRef(null);
  const diagram3dRef = useRef(null);
  
  // Mechanism data
  const mechanisms = [
    {
      id: 'respiration',
      title: 'Respiration Control',
      color: 'tech-section__bg-primary',
      position: { x: 0, y: 0, z: 120 },
      icon: '🍃',
      description: 'Regulates gas exchange and slows down ethylene-induced ripening',
      details: [
        'Creates semi-permeable barrier on fruit surface',
        'Reduces CO₂ and ethylene production',
        'Slows metabolic processes without anaerobic conditions',
        'Extends shelf life by delaying ripening cascade'
      ],
    },
    {
      id: 'moisture',
      title: 'Moisture Optimization',
      color: 'tech-section__bg-secondary',
      position: { x: 0, y: 0, z: -120 },
      icon: '💧',
      description: 'Prevents dehydration while avoiding excess moisture that promotes mold',
      details: [
        'Creates optimal moisture equilibrium',
        'Prevents fruit shriveling and weight loss',
        'Balances water activity to deter microbial growth',
        'Maintains cell turgor pressure for firmness'
      ],
    },
    {
      id: 'microbial',
      title: 'Microbial Inhibition',
      color: 'tech-section__bg-success',
      position: { x: 120, y: 0, z: 0 },
      icon: '🦠',
      description: 'Creates inhospitable environment for bacteria and fungi',
      details: [
        'Lowers surface pH to inhibit microbial proliferation',
        'Creates natural antimicrobial barrier',
        'Prevents spoilage organism colonization',
        'Targets specific decay-causing pathogens'
      ],
    },
    {
      id: 'oxidation',
      title: 'Oxidation Prevention',
      color: 'tech-section__bg-info',
      position: { x: -120, y: 0, z: 0 },
      icon: '⚛️',
      description: 'Prevents enzymatic browning and maintains color stability',
      details: [
        'Neutralizes free radicals that damage cell membranes',
        'Inhibits polyphenol oxidase enzymatic activity',
        'Preserves anthocyanins responsible for blue color',
        'Maintains nutritional value and antioxidant content'
      ],
    }
  ];

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
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto rotation logic
  useEffect(() => {
    if (!autoRotate) return;
    
    const timer = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: (prev.y + 0.5) % 360
      }));
    }, 50);
    
    return () => clearInterval(timer);
  }, [autoRotate]);
  
  // Mouse/touch handlers for manual rotation
  const handleDragStart = (e) => {
    setAutoRotate(false);
    setIsDragging(true);
    
    // Handle both mouse and touch events
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX && clientY) {
      setStartPoint({
        x: clientX,
        y: clientY
      });
    }
  };
  
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    // Handle both mouse and touch events
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX && clientY) {
      const deltaX = clientX - startPoint.x;
      const deltaY = clientY - startPoint.y;
      
      setRotation(prev => ({
        x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.5)),
        y: prev.y + deltaX * 0.5
      }));
      
      setStartPoint({
        x: clientX,
        y: clientY
      });
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  // Add and remove event listeners
  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleDragMove(e);
      }
    };
    const handleTouchEnd = () => handleDragEnd();
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Calculate 3D position with current rotation applied
  const getTransform = (mechanism) => {
    const { x, y, z } = mechanism.position;
    const angleX = rotation.x * (Math.PI / 180);
    const angleY = rotation.y * (Math.PI / 180);
    
    // Apply rotation matrices
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    
    // Rotate around Y axis first
    const y1 = y;
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    
    // Then rotate around X axis
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;
    
    // Calculate z-based scale for perspective effect
    const scale = Math.max(0.6, Math.min(1.4, 1000 / (1000 - z2)));
    const opacity = Math.max(0.5, Math.min(1, scale * 0.8));
    
    return {
      transform: `translate3d(${x1}px, ${y2}px, ${z2}px) scale(${scale})`,
      zIndex: Math.round(z2),
      opacity
    };
  };
  
  // Handle mechanism selection
  const handleMechanismClick = (id) => {
    if (activeMechanism === id) {
      setActiveMechanism(null);
    } else {
      setActiveMechanism(id);
      setAutoRotate(false);
    }
  };

  // Reset position and view
  const handleReset = () => {
    setRotation({ x: 20, y: 0 });
    setActiveMechanism(null);
    setAutoRotate(true);
  };

  return (
    <section className="tech-section" id="technology">
      {/* Section header outside main container */}
      <div className="tech-section__header">
        <h2 className="tech-section__title">
          Our Multi-Mechanism Technology
        </h2>
        <p className="tech-section__subtitle">
          Spanex preservatives work through four synergistic mechanisms that provide comprehensive 
          protection against all major causes of produce deterioration.
        </p>
      </div>

      <div 
        ref={containerRef} 
        className={`tech-section__container ${isVisible ? 'visible' : ''}`}
      >
        {/* Main Diagram container */}
        <div className="tech-section__diagram-container">
          {/* Controls */}
          <div className="tech-section__controls">
            <button 
              className={`tech-section__btn ${autoRotate ? 'tech-section__btn--active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            </button>
            <button 
              className="tech-section__btn tech-section__btn--reset"
              onClick={handleReset}
            >
              Reset View
            </button>
          </div>
          
          {/* 3D Interactive Diagram */}
          <div 
            ref={diagram3dRef}
            className="tech-section__3d-container"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {/* Center berry */}
            <div className="tech-section__center-berry">
              <div className="tech-section__center-label">
                Spanex<br/>Technology
              </div>
            </div>
            
            {/* Orbiting mechanisms */}
            {mechanisms.map((mechanism) => {
              const style = getTransform(mechanism);
              const isActive = activeMechanism === mechanism.id;
              
              return (
                <div 
                  key={mechanism.id}
                  className={`tech-section__mechanism ${mechanism.color} ${isActive ? 'tech-section__mechanism--active' : ''}`}
                  style={style}
                  onClick={() => handleMechanismClick(mechanism.id)}
                >
                  <div className="tech-section__mechanism-content">
                    <div className="tech-section__mechanism-icon">{mechanism.icon}</div>
                    <div className="tech-section__mechanism-title">{mechanism.title}</div>
                  </div>
                  
                  {/* Connection line to center - visually connects mechanism to center berry */}
                  <div 
                    style={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      height: '1px',
                      width: '60px',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      transformOrigin: 'left center',
                      transform: `rotate(${Math.atan2(mechanism.position.y, mechanism.position.x) * (180 / Math.PI)}deg)`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
          
          {/* Detail panel - shows information about the selected mechanism */}
          <div className={`tech-section__details ${activeMechanism ? 'tech-section__details--active' : ''}`}>
            {activeMechanism && mechanisms.find(m => m.id === activeMechanism) && (
              <div className="tech-section__details-content">
                <div className="tech-section__details-header">
                  <div className={`tech-section__details-icon ${mechanisms.find(m => m.id === activeMechanism).color}`}>
                    <span>{mechanisms.find(m => m.id === activeMechanism).icon}</span>
                  </div>
                  <h3 className="tech-section__details-title">{mechanisms.find(m => m.id === activeMechanism).title}</h3>
                </div>
                
                <p className="tech-section__details-description">{mechanisms.find(m => m.id === activeMechanism).description}</p>
                
                <div className="tech-section__details-section">
                  <h4 className="tech-section__section-title">How it works:</h4>
                  <ul className="tech-section__details-list">
                    {mechanisms.find(m => m.id === activeMechanism).details.map((detail, i) => (
                      <li key={i} className="tech-section__details-item">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Indicator bars */}
          <div className="tech-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`tech-section__indicator-bar ${index < 5 ? 'tech-section__indicator-bar--active' : ''}`}
              ></div>
            ))}
          </div>
          
          <div className="tech-section__instructions">
            Drag to rotate the diagram • Click on a mechanism for details
          </div>
        </div>

        {/* Mechanism cards for smaller screens or additional information */}
        <div className="tech-section__mechanism-grid">
          {mechanisms.map((mechanism, index) => (
            <div 
              key={mechanism.id} 
              className={`tech-section__mechanism-card tech-section__fade-in tech-section__fade-in-delay-${index + 1}`}
              onClick={() => handleMechanismClick(mechanism.id)}
            >
              <div className={`tech-section__card-icon ${mechanism.color}`}>
                <span>{mechanism.icon}</span>
              </div>
              <h3 className="tech-section__card-title">{mechanism.title}</h3>
              <p className="tech-section__card-description">
                {mechanism.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Footnote card */}
        <div className="tech-section__footnote">
          <p className="tech-section__footnote-text">
            Our patented technology creates a multi-faceted protective system that addresses all major causes of produce deterioration simultaneously.
          </p>
          
          {/* Visual indicator bars */}
          <div className="tech-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`tech-section__indicator-bar ${index < 5 ? 'tech-section__indicator-bar--active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;