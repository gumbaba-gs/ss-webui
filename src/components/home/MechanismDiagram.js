import React, { useState, useEffect, useRef } from 'react';

const MechanismDiagram = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState({ x: 20, y: 0 });
  const [activeMechanism, setActiveMechanism] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
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
  
  // Mechanism data - updated with theme color classes
  const mechanisms = [
    {
      id: 'respiration',
      title: 'Respiration Control',
      color: 'bg-primary',
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
      color: 'bg-secondary',
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
      color: 'bg-success',
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
      color: 'bg-info',
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

  // Glowing container styles matching the food waste counter
  const glowingContainerStyle = {
    background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
    border: "1px solid rgba(0, 255, 255, 0.2)",
    fontFamily: "'Courier New', monospace"
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-xl" style={glowingContainerStyle}>
      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-8">
        <button 
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-colors ${autoRotate ? 'bg-error text-background' : 'bg-primary text-background'}`}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
        </button>
        <button 
          className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gray-500 text-background font-medium text-sm sm:text-base transition-colors"
          onClick={() => {
            setRotation({ x: 20, y: 0 });
            setActiveMechanism(null);
            setAutoRotate(true);
          }}
        >
          Reset View
        </button>
      </div>
      
      {/* 3D Container - Responsive height */}
      <div 
        ref={containerRef}
        className="relative w-full perspective-1000 mb-6 cursor-grab"
        style={{ 
          height: "min(70vh, 28rem)",
          touchAction: 'none' 
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {/* Center blueberry */}
        <div 
          className="absolute rounded-full bg-primary w-24 sm:w-32 h-24 sm:h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl z-10 border-4 border-primary"
          style={{
            background: 'radial-gradient(circle at 30% 30%, var(--primary-color), var(--primary-color-rgb))'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-background font-bold text-base sm:text-lg text-center">
              Spanex<br/>Technology
            </div>
          </div>
        </div>
        
        {/* Orbiting mechanisms - Responsive sizing */}
        {mechanisms.map((mechanism) => {
          const style = getTransform(mechanism);
          const isActive = activeMechanism === mechanism.id;
          
          return (
            <div 
              key={mechanism.id}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 rounded-full ${mechanism.color} cursor-pointer transition-transform duration-300 shadow-lg border-2 border-background`}
              style={style}
              onClick={() => handleMechanismClick(mechanism.id)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-background p-2">
                <div className="text-xl sm:text-2xl mb-1">{mechanism.icon}</div>
                <div className="font-bold text-center text-xs sm:text-sm leading-tight">{mechanism.title}</div>
              </div>
              
              {/* Connection line to center */}
              <div 
                className="absolute top-1/2 left-1/2 h-0.5 bg-background opacity-50"
                style={{ 
                  width: '75px',
                  transformOrigin: 'left center',
                  transform: `rotate(${Math.atan2(mechanism.position.y, mechanism.position.x) * (180 / Math.PI)}deg)`,
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Detail panel */}
      <div className="bg-background rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out" 
           style={{ 
             maxHeight: activeMechanism ? '500px' : '0', 
             opacity: activeMechanism ? 1 : 0 
           }}>
        {activeMechanism && mechanisms.find(m => m.id === activeMechanism) && (
          <div className="p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-background mr-3 ${mechanisms.find(m => m.id === activeMechanism).color}`}>
                <span className="text-xl">{mechanisms.find(m => m.id === activeMechanism).icon}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-text">{mechanisms.find(m => m.id === activeMechanism).title}</h3>
            </div>
            
            <p className="text-text mb-4">{mechanisms.find(m => m.id === activeMechanism).description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-text mb-2">How it works:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {mechanisms.find(m => m.id === activeMechanism).details.map((detail, i) => (
                  <li key={i} className="text-text">{detail}</li>
                ))}
              </ul>
            </div>
            
            <div className="pt-3 border-t border-border">
              
              <p className="text-text">{mechanisms.find(m => m.id === activeMechanism).ingredients}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Counter bars similar to food waste counter */}
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
      
      <div className="text-center  text-color: white text-xs sm:text-sm text-text mt-4"
      style={{ color: '#0B3D91' }}>
        Drag to rotate the diagram • Click on a mechanism for details
      </div>
    </div>
  );
};

export default MechanismDiagram;