import React, { useState, useRef, useEffect } from 'react';
import './BeforeAfterSlider.css';

// Import images directly to ensure they're properly bundled by webpack
import treatedDay0 from './images/spanex-treated/0.png';
import treatedDay3 from './images/spanex-treated/3.png';
import treatedDay7 from './images/spanex-treated/7.png';
import treatedDay11 from './images/spanex-treated/11.png';
import treatedDay14 from './images/spanex-treated/14.png';

import untreatedDay0 from './images/untreated/0.png';
import untreatedDay3 from './images/untreated/3.png';
import untreatedDay7 from './images/untreated/7.png';
import untreatedDay11 from './images/untreated/11.png';
import untreatedDay14 from './images/untreated/14.png';

const BeforeAfterComparison = () => {
  const [currentDay, setCurrentDay] = useState(14); // Default to day 14 to match the screenshot
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);
  const outerContainerRef = useRef(null);
  
  // Days to display in the comparison
  const days = [0, 3, 7, 11, 14];

  // Track window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Determine if we should use stacked layout on small screens
  const useStackedLayout = windowWidth < 600;
  
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
    
    if (outerContainerRef.current) {
      observer.observe(outerContainerRef.current);
    }
    
    return () => {
      if (outerContainerRef.current) {
        observer.unobserve(outerContainerRef.current);
      }
    };
  }, []);
  
  // Get the correct image based on current day
  const getTreatedImage = () => {
    switch(currentDay) {
      case 0: return treatedDay0;
      case 3: return treatedDay3;
      case 7: return treatedDay7;
      case 11: return treatedDay11;
      case 14: return treatedDay14;
      default: return treatedDay14;
    }
  };
  
  const getUntreatedImage = () => {
    switch(currentDay) {
      case 0: return untreatedDay0;
      case 3: return untreatedDay3;
      case 7: return untreatedDay7;
      case 11: return untreatedDay11;
      case 14: return untreatedDay14;
      default: return untreatedDay14;
    }
  };

  // Main container style
  const outerContainerStyle = {
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    padding: windowWidth < 768 ? '1rem' : '1.5rem',
    animation: isVisible ? 'fadeIn 1s ease-out' : 'none',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  };

  // Card style
  const cardStyle = {
    background: 'linear-gradient(45deg, rgba(11, 61, 145, 0.8), rgba(0, 128, 128, 0.9))',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 255, 255, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: windowWidth < 768 ? '1rem' : '1.5rem',
    marginBottom: windowWidth < 768 ? '1rem' : '1.5rem'
  };

  // Header style
  const headerStyle = {
    fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem',
    fontWeight: '600',
    marginBottom: windowWidth < 768 ? '0.75rem' : '1rem',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  // Image container dimensions
  const getImageContainerHeight = () => {
    if (useStackedLayout) {
      return 'auto'; // Auto height for stacked layout
    }
    return windowWidth < 768 ? '250px' : '336px';
  };

  return (
    <div 
      ref={outerContainerRef}
      style={outerContainerStyle}
      className="comparison-wrapper"
    >     
      {/* Day selector card */}
      <div style={cardStyle} className="day-selector-card">
        <h3 style={headerStyle}>Select Day For Comparison</h3>
        <div className="day-selector" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
          margin: '0.5rem 0'
        }}>
          {days.map((day) => (
            <button
              key={day}
              className={`day-button ${currentDay === day ? 'active' : ''}`}
              style={{
                padding: windowWidth < 768 ? '0.4rem 0.75rem' : '0.5rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: currentDay === day ? 
                  'rgba(0, 48, 73, 0.9)' : 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: currentDay === day ? '600' : '400',
                cursor: 'pointer',
                minWidth: windowWidth < 768 ? '70px' : '80px',
                fontSize: windowWidth < 768 ? '0.9rem' : '1rem',
                boxShadow: currentDay === day ? 
                  '0 0 10px rgba(0, 255, 255, 0.4)' : 'none'
              }}
              onClick={() => setCurrentDay(day)}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main comparison card */}
      <div style={cardStyle} className="comparison-card">
        <h3 style={headerStyle}>Blueberry Comparison</h3>
        
        <div 
          className="image-comparison-container" 
          ref={containerRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header bar */}
          <div style={{
            position: 'relative',
            zIndex: 20,
            display: 'flex',
            height: windowWidth < 768 ? '36px' : '44px'
          }}>
            {/* Treated header */}
            <div style={{
              flex: '1',
              backgroundColor: 'rgb(23, 49, 123)', // Darker blue to match screenshot
              color: 'white',
              fontWeight: '600',
              padding: windowWidth < 768 ? '0.5rem' : '0.75rem',
              textAlign: 'center',
              borderRight: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: windowWidth < 768 ? '0.8rem' : '1rem'
            }}>
              SPANEX TREATED
            </div>
            
            {/* Untreated header */}
            <div style={{
              flex: '1',
              backgroundColor: 'rgb(216, 80, 80)', // Darker red to match screenshot
              color: 'white',
              fontWeight: '600',
              padding: windowWidth < 768 ? '0.5rem' : '0.75rem',
              textAlign: 'center',
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: windowWidth < 768 ? '0.8rem' : '1rem'
            }}>
              UNTREATED
            </div>
          </div>
          
          {/* Image container with static side-by-side or stacked display */}
          <div style={{
            display: 'flex',
            flexDirection: useStackedLayout ? 'column' : 'row',
            height: getImageContainerHeight(),
            backgroundColor: 'rgb(4, 93, 122)' // Background color to match screenshot
          }}>
            {/* Left/Top side (Treated) */}
            <div style={{
              width: useStackedLayout ? '100%' : '50%',
              height: useStackedLayout ? '250px' : '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRight: useStackedLayout ? 'none' : '1px solid white',
              borderBottom: useStackedLayout ? '1px solid white' : 'none'
            }}>
              <img 
                src={getTreatedImage()} 
                alt="Spanex Treated Blueberry" 
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain'
                }}
              />
              
              {/* Day indicator overlay */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: windowWidth < 768 ? '0.75rem' : '0.875rem',
                zIndex: 40
              }}>
                Day {currentDay}
              </div>
            </div>
            
            {/* Right/Bottom side (Untreated) */}
            <div style={{
              width: useStackedLayout ? '100%' : '50%',
              height: useStackedLayout ? '250px' : '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderLeft: useStackedLayout ? 'none' : '1px solid white',
              borderTop: useStackedLayout ? '1px solid white' : 'none'
            }}>
              <img 
                src={getUntreatedImage()} 
                alt="Untreated Control Blueberry" 
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
          
          {/* Static divider line - no slider functionality - only show in row layout */}
          {!useStackedLayout && (
            <div style={{ 
              position: 'absolute',
              top: windowWidth < 768 ? '36px' : '44px',
              bottom: 0,
              left: '50%',
              width: '2px',
              backgroundColor: 'white',
              zIndex: 30,
              transform: 'translateX(-50%)'
            }}></div>
          )}
        </div>
        
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: 'white',
          opacity: 0.9,
          fontSize: windowWidth < 768 ? '0.85rem' : '1rem'
        }}>
          Side-by-side comparison of treated and untreated berries
        </div>
      </div>
      
      {/* Observation notes - separate card */}
      <div style={cardStyle} className="observations-card">
        <h3 style={headerStyle}>Observations at Day {currentDay}</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: useStackedLayout ? '1fr' : '1fr 1fr',
          gap: '1.5rem'
        }}>
          <div>
            <h4 style={{
              color: 'rgb(152, 245, 255)',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: windowWidth < 768 ? '0.9rem' : '1rem'
            }}>Spanex Treated:</h4>
            <ul style={{
              paddingLeft: '1.5rem',
              margin: 0,
              color: 'white',
              fontSize: windowWidth < 768 ? '0.85rem' : '1rem'
            }}>
              {currentDay <= 3 && <li>Vibrant color and firmness maintained</li>}
              {currentDay > 3 && <li>Excellent color retention</li>}
              {currentDay <= 7 && <li>No visible spoilage</li>}
              {currentDay > 7 && currentDay <= 11 && <li>Minimal moisture loss</li>}
              {currentDay > 11 && <li>Still marketable quality</li>}
              {currentDay > 7 && <li>Texture remains firm</li>}
              {currentDay > 11 && <li>Some minor color changes</li>}
              {currentDay > 3 && <li>Low microbial activity</li>}
            </ul>
          </div>
          <div style={{ marginTop: useStackedLayout ? '1.5rem' : 0 }}>
            <h4 style={{
              color: 'rgb(255, 180, 180)',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: windowWidth < 768 ? '0.9rem' : '1rem'
            }}>Untreated Control:</h4>
            <ul style={{
              paddingLeft: '1.5rem',
              margin: 0,
              color: 'white',
              fontSize: windowWidth < 768 ? '0.85rem' : '1rem'
            }}>
              {currentDay <= 3 && <li>Beginning to lose firmness</li>}
              {currentDay > 3 && <li>Significant color degradation</li>}
              {currentDay > 3 && <li>Visible moisture loss</li>}
              {currentDay > 7 && <li>Mold spots appearing</li>}
              {currentDay > 7 && <li>Texture becoming soft</li>}
              {currentDay > 11 && <li>No longer marketable</li>}
              {currentDay > 11 && <li>Significant shrinkage</li>}
              {currentDay > 7 && <li>High microbial activity</li>}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Notes and counter - separate card */}
      <div style={cardStyle} className="notes-card">
        <div style={{
          textAlign: 'center',
          fontSize: windowWidth < 768 ? '0.8rem' : '0.875rem',
          color: 'white',
          opacity: 0.9,
          fontStyle: 'italic',
          marginBottom: '1.5rem'
        }}>
          Note: This visualization represents typical results based on laboratory and field testing.
          Individual results may vary based on blueberry variety and storage conditions.
        </div>
        
        {/* Counter bars */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: windowWidth < 768 ? '0.2rem' : '0.25rem'
        }}>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              style={{
                height: windowWidth < 768 ? '6px' : '8px',
                width: windowWidth < 768 ? '24px' : '30px',
                background: index < 5 ? 
                  'linear-gradient(to right, var(--secondary-color), var(--accent-color))' : 
                  'rgba(0, 255, 255, 0.1)',
                borderRadius: '4px',
                border: index < 5 ? 
                  '1px solid rgba(0, 255, 255, 0.5)' : 
                  '1px solid rgba(0, 255, 255, 0.2)',
                boxShadow: index < 5 ? 
                  '0 0 10px rgba(0, 255, 255, 0.4)' : 
                  '0 0 5px rgba(0, 255, 255, 0.1)'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;