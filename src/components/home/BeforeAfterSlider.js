import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDay, setCurrentDay] = useState(21); // Default to day 21 for dramatic effect
  const sliderRef = useRef(null);
  
  // Days to display in the comparison
  const days = [0, 7, 14, 21, 28];

  // Photo placeholders - for both treated and untreated berries at each day
  const photos = {
    treated: {
      0: { src: "/images/treated-day0.jpg", alt: "Spanex Treated Berries - Day 0" },
      7: { src: "/images/treated-day7.jpg", alt: "Spanex Treated Berries - Day 7" },
      14: { src: "/images/treated-day14.jpg", alt: "Spanex Treated Berries - Day 14" },
      21: { src: "/images/treated-day21.jpg", alt: "Spanex Treated Berries - Day 21" },
      28: { src: "/images/treated-day28.jpg", alt: "Spanex Treated Berries - Day 28" },
    },
    untreated: {
      0: { src: "/images/untreated-day0.jpg", alt: "Untreated Berries - Day 0" },
      7: { src: "/images/untreated-day7.jpg", alt: "Untreated Berries - Day 7" },
      14: { src: "/images/untreated-day14.jpg", alt: "Untreated Berries - Day 14" },
      21: { src: "/images/untreated-day21.jpg", alt: "Untreated Berries - Day 21" },
      28: { src: "/images/untreated-day28.jpg", alt: "Untreated Berries - Day 28" },
    }
  };
  
  // Handle mouse down event on slider
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (isDragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(newPosition);
    }
  };
  
  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleMouseDown(touch);
  };
  
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove(touch);
  };
  
  const handleTouchEnd = () => {
    handleMouseUp();
  };
  
  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
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
      const moldClass = 'after:absolute after:w-2 after:h-2 after:bg-gray-200 after:rounded-full after:opacity-70';
      
      // For untreated berries, some should be shriveled after day 14
      const isShriveled = !isTreated && effectiveDay > 14 && Math.random() > 0.4;
      const shriveled = isShriveled ? 'scale-75' : '';
      
      berries.push(
        <div 
          key={i} 
          className={`${appearanceClass} ${isShriveled ? shriveled : ''} ${hasMold ? moldClass : ''}
                      w-5 h-5 sm:w-6 sm:h-6 rounded-full relative transition-all duration-300 shadow-md m-1`}
          style={{
            transform: `translate(${Math.random() * 5}px, ${Math.random() * 5}px) ${isShriveled ? 'scale(0.75)' : 'scale(1)'}`,
            opacity: !isTreated && effectiveDay > 21 ? (Math.random() * 0.5 + 0.3) : 1
          }}
        />
      );
    }
    
    return berries;
  };

  // Glowing container style matching food waste counter
  const glowingContainerStyle = {
    background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
    border: "1px solid rgba(0, 255, 255, 0.2)",
    fontFamily: "'Courier New', monospace"
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-xl" style={glowingContainerStyle}>     
      {/* Day selector - Responsive */}
      <div className="w-full flex flex-wrap sm:flex-nowrap justify-between mb-6 sm:mb-8 px-2 sm:px-4 gap-2 sm:gap-0">
        {days.map((day) => (
          <button
            key={day}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${
              currentDay === day 
                ? 'bg-primary text-background' 
                : 'bg-primary-10 text-text hover:bg-primary-20'
            } font-medium transition-colors`}
            onClick={() => setCurrentDay(day)}
          >
            Day {day}
          </button>
        ))}
      </div>
      
      {/* Main comparison container - Responsive height */}
      <div 
        ref={sliderRef}
        className="relative w-full border-2 border-border rounded-lg overflow-hidden cursor-col-resize mb-4 shadow-inner"
        style={{
          height: "min(70vh, 24rem)"
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Left side (Treated) */}
        <div className="absolute top-0 left-0 w-full h-full bg-surface flex flex-col">
          <div className="bg-primary text-background py-1 sm:py-2 px-2 sm:px-4 font-semibold text-center text-sm sm:text-lg">
            SPANEX TREATED
          </div>
          <div className="flex-1 relative overflow-hidden">
            {/* Photo placeholder for treated berries */}
            <div className="absolute inset-0 w-full h-full bg-primary-5 flex items-center justify-center">
              <img 
                src={`/api/placeholder/800/640?text=Treated+Berries+Day+${currentDay}`}
                alt={photos.treated[currentDay]?.alt || `Treated Berries - Day ${currentDay}`}
                className="w-full h-full object-cover opacity-40"
              />
              
              {/* Overlay of simulated berries */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                <div className="flex flex-wrap justify-center items-center max-w-xs sm:max-w-md">
                  {generateBerries(true)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side (Untreated) - clipped by slider */}
        <div 
          className="absolute top-0 right-0 w-full h-full bg-surface flex flex-col" 
          style={{ 
            clipPath: `inset(0 0 0 ${sliderPosition}%)` 
          }}
        >
          <div className="bg-error text-background py-1 sm:py-2 px-2 sm:px-4 font-semibold text-center text-sm sm:text-lg">
            UNTREATED CONTROL
          </div>
          <div className="flex-1 relative overflow-hidden">
            {/* Photo placeholder for untreated berries */}
            <div className="absolute inset-0 w-full h-full bg-error-5 flex items-center justify-center">
              <img 
                src={`/api/placeholder/800/640?text=Untreated+Berries+Day+${currentDay}`}
                alt={photos.untreated[currentDay]?.alt || `Untreated Berries - Day ${currentDay}`}
                className="w-full h-full object-cover opacity-40"
              />
              
              {/* Overlay of simulated berries */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                <div className="flex flex-wrap justify-center items-center max-w-xs sm:max-w-md">
                  {generateBerries(false)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider control */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-background cursor-col-resize" 
          style={{ 
            left: `${sliderPosition}%`,
            marginLeft: '-1px'
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-background rounded-full shadow-lg flex items-center justify-center border border-accent">
            <div className="flex flex-col items-center text-accent">
              <div className="transform -rotate-90">⟷</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Photo size information */}
      <div className="text-xs text-center mb-4 text-gray-500">
        <p>Recommended photo dimensions: 800×640px (5:4 ratio)</p>
        <p>Supported formats: JPG, PNG, WebP</p>
      </div>
      
      {/* Observation notes - Responsive grid */}
      <div className="mt-4 sm:mt-6 bg-primary-5 p-3 sm:p-4 rounded-lg border border-accent border-opacity-20 w-full">
        <h3 className="font-bold text-text mb-2">Observations at Day {currentDay}:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-primary">Spanex Treated:</h4>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-text">
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
          <div>
            <h4 className="font-semibold text-error">Untreated Control:</h4>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-text">
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
      
      {/* Note and counter bars from food waste counter */}
      <div className="mt-4 text-xs sm:text-sm text-text italic text-center">
        Note: This visualization represents typical results based on laboratory and field testing.
        Individual results may vary based on blueberry variety and storage conditions.
      </div>
      
      {/* Counter bars */}
      <div className="counter-bars mt-6 text-center">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="counter-bar inline-block w-6 h-2 mx-1 rounded-full"
            style={{
              background: index < 5 ? 'rgba(0, 255, 255, 0.7)' : 'rgba(0, 255, 255, 0.2)'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;