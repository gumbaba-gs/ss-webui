import React, { useState, useRef, useEffect } from 'react';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDay, setCurrentDay] = useState(21); // Default to day 21 for dramatic effect
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  
  // Days to display in the comparison
  const days = [0, 7, 14, 21, 28];

  // Handle mouse down event on slider
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX || (e.touches && e.touches[0].clientX));
  };
  
  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e.clientX || (e.touches && e.touches[0].clientX));
    }
  };
  
  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Update slider position based on cursor/touch position
  const updateSliderPosition = (clientX) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(newPosition);
  };
  
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
  
  // Add and remove event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e) => {
      if (isDragging) {
        e.preventDefault(); // Prevent scrolling while dragging
        handleMouseMove(e);
      }
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);
  
  // Function to get berry appearance class based on day and whether it's treated
  const getBerryAppearance = (day, isTreated) => {
    // Untreated berries degrade faster
    if (!isTreated) {
      if (day <= 7) return 'bg-primary';
      if (day <= 14) return 'bg-secondary';
      if (day <= 21) return 'bg-accent';
      return 'bg-surface';
    }
    // Treated berries maintain appearance longer
    else {
      if (day <= 14) return 'bg-primary';
      if (day <= 21) return 'bg-secondary';
      if (day <= 28) return 'bg-accent';
      return 'bg-surface';
    }
  };
  
  // Generate berries for a section (treated or untreated)
  const generateBerries = (isTreated) => {
    const berryCount = 24;
    const berries = [];
    
    for (let i = 0; i < berryCount; i++) {
      // Vary the degradation slightly for each berry to look more natural
      const dayOffset = Math.floor(Math.random() * 4) - 2;
      const effectiveDay = currentDay + dayOffset;
      const appearanceClass = getBerryAppearance(effectiveDay, isTreated);
      
      // For untreated berries, add some mold spots after day 14
      const hasMold = !isTreated && effectiveDay > 14 && Math.random() > 0.5;
      
      // For untreated berries, some should be shriveled after day 14
      const isShriveled = !isTreated && effectiveDay > 14 && Math.random() > 0.4;
      
      berries.push(
        <div 
          key={i} 
          className={`berry ${appearanceClass} ${isShriveled ? 'shriveled' : ''} ${hasMold ? 'moldy' : ''}`}
          style={{
            transform: `translate(${Math.random() * 5}px, ${Math.random() * 5}px)`,
            opacity: !isTreated && effectiveDay > 21 ? (Math.random() * 0.5 + 0.3) : 1
          }}
        />
      );
    }
    
    return berries;
  };

  return (
    <div 
      ref={containerRef}
      className={`slider-wrapper ${isVisible ? 'visible' : ''}`}
    >     
      {/* Day selector */}
      <div className="day-selector">
        {days.map((day) => (
          <button
            key={day}
            className={`day-button ${currentDay === day ? 'active' : ''}`}
            onClick={() => setCurrentDay(day)}
          >
            Day {day}
          </button>
        ))}
      </div>
      
      {/* Main comparison container */}
      <div 
        ref={sliderRef}
        className="comparison-container"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Left side (Treated) */}
        <div className="comparison-side treated-side">
          <div className="side-header">SPANEX TREATED</div>
          <div className="berries-container">
            <div className="berries-visual">
              {generateBerries(true)}
            </div>
          </div>
        </div>
        
        {/* Right side (Untreated) - clipped by slider */}
        <div 
          className="comparison-side untreated-side" 
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="side-header">UNTREATED CONTROL</div>
          <div className="berries-container">
            <div className="berries-visual">
              {generateBerries(false)}
            </div>
          </div>
        </div>
        
        {/* Slider control */}
        <div 
          className="slider-control"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="slider-handle">
            <div className="slider-arrows">⟷</div>
          </div>
        </div>
      </div>
      
      {/* Observation notes */}
      <div className="observations">
        <h3 className="observations-title">Observations at Day {currentDay}:</h3>
        <div className="observations-grid">
          <div className="observation-column">
            <h4 className="observation-heading treated">Spanex Treated:</h4>
            <ul className="observation-list">
              {currentDay <= 7 && <li>Vibrant color and firmness maintained</li>}
              {currentDay > 7 && <li>Excellent color retention</li>}
              {currentDay <= 14 && <li>No visible spoilage</li>}
              {currentDay > 14 && currentDay <= 21 && <li>Minimal moisture loss</li>}
              {currentDay > 21 && <li>Still marketable quality</li>}
              {currentDay > 14 && <li>Texture remains firm</li>}
              {currentDay > 21 && <li>Some minor color changes</li>}
              {currentDay > 7 && <li>Low microbial activity</li>}
            </ul>
          </div>
          <div className="observation-column">
            <h4 className="observation-heading untreated">Untreated Control:</h4>
            <ul className="observation-list">
              {currentDay <= 7 && <li>Beginning to lose firmness</li>}
              {currentDay > 7 && <li>Significant color degradation</li>}
              {currentDay > 7 && <li>Visible moisture loss</li>}
              {currentDay > 14 && <li>Mold spots appearing</li>}
              {currentDay > 14 && <li>Texture becoming soft</li>}
              {currentDay > 21 && <li>No longer marketable</li>}
              {currentDay > 21 && <li>Significant shrinkage</li>}
              {currentDay > 14 && <li>High microbial activity</li>}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Note */}
      <div className="slider-note">
        Note: This visualization represents typical results based on laboratory and field testing.
        Individual results may vary based on blueberry variety and storage conditions.
      </div>
      
      {/* Counter bars */}
      <div className="counter-bars">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`counter-bar ${index < 5 ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;