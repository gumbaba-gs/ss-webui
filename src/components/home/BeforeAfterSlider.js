import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDay, setCurrentDay] = useState(21); // Default to day 21 for dramatic effect
  const sliderRef = useRef(null);
  
  // Days to display in the comparison
  const days = [0, 7, 14, 21, 28];
  
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
      if (day <= 7) return 'bg-blue-700';
      if (day <= 14) return 'bg-blue-600';
      if (day <= 21) return 'bg-purple-500';
      return 'bg-gray-500';
    } 
    // Treated berries maintain appearance longer
    else {
      if (day <= 14) return 'bg-blue-700';
      if (day <= 21) return 'bg-blue-600';
      if (day <= 28) return 'bg-blue-600';
      return 'bg-blue-500';
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
                      w-6 h-6 rounded-full relative transition-all duration-300 shadow-md m-1`}
          style={{
            transform: `translate(${Math.random() * 5}px, ${Math.random() * 5}px) ${isShriveled ? 'scale(0.75)' : 'scale(1)'}`,
            opacity: !isTreated && effectiveDay > 21 ? (Math.random() * 0.5 + 0.3) : 1
          }}
        />
      );
    }
    
    return berries;
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">      
      {/* Day selector */}
      <div className="w-full flex justify-between mb-8 px-4">
        {days.map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-full ${currentDay === day ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} font-medium transition-colors`}
            onClick={() => setCurrentDay(day)}
          >
            Day {day}
          </button>
        ))}
      </div>
      
      {/* Main comparison container */}
      <div 
        ref={sliderRef}
        className="relative w-full h-96 border-2 border-gray-300 rounded-lg overflow-hidden cursor-col-resize mb-4 shadow-inner"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Left side (Treated) */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100 flex flex-col">
          <div className="bg-blue-600 text-white py-2 px-4 font-semibold text-center text-lg">
            SPANEX TREATED
          </div>
          <div className="flex-1 flex items-center justify-center flex-wrap p-8">
            <div className="flex flex-wrap justify-center items-center">
              {generateBerries(true)}
            </div>
          </div>
        </div>
        
        {/* Right side (Untreated) - clipped by slider */}
        <div 
          className="absolute top-0 right-0 w-full h-full bg-gray-100 flex flex-col" 
          style={{ 
            clipPath: `inset(0 0 0 ${sliderPosition}%)` 
          }}
        >
          <div className="bg-red-600 text-white py-2 px-4 font-semibold text-center text-lg">
            UNTREATED CONTROL
          </div>
          <div className="flex-1 flex items-center justify-center flex-wrap p-8">
            <div className="flex flex-wrap justify-center items-center">
              {generateBerries(false)}
            </div>
          </div>
        </div>
        
        {/* Slider control */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize" 
          style={{ 
            left: `${sliderPosition}%`,
            marginLeft: '-1px'
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="transform -rotate-90">⟷</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Observation notes */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 w-full">
        <h3 className="font-bold text-gray-700 mb-2">Observations at Day {currentDay}:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-600">Spanex Treated:</h4>
            <ul className="list-disc pl-5 text-sm">
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
            <h4 className="font-semibold text-red-600">Untreated Control:</h4>
            <ul className="list-disc pl-5 text-sm">
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
      
      <div className="mt-4 text-sm text-gray-500 italic text-center">
        Note: This visualization represents typical results based on laboratory and field testing.
        Individual results may vary based on blueberry variety and storage conditions.
      </div>
    </div>
  );
};

export default BeforeAfterSlider;