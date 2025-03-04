import React, { useEffect, useState, useRef } from 'react';

const FoodWasteCounter = () => {
  const [counterValue, setCounterValue] = useState(0);
  const [activeBars, setActiveBars] = useState(5);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  // Define the startRealTimeCounter function first
  const startRealTimeCounter = (baseValue) => {
    const perSecond = baseValue / (365 * 24 * 60 * 60);
    const updateInterval = 100; // ms

    setInterval(() => {
      setCounterValue(prev => {
        const newValue = prev + perSecond * (updateInterval / 1000);
        
        // Update active bars
        const newActiveBars = Math.min(8, Math.floor((newValue - baseValue) / 10000000) + 5);
        if (newActiveBars !== activeBars) {
          setActiveBars(newActiveBars);
        }
        
        return newValue;
      });
    }, updateInterval);
  };

  useEffect(() => {
    const targetValue = 3100000000;
    const duration = 2000; // 2 seconds
    const interval = 50; // update every 50ms
    const steps = duration / interval;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        let currentStep = 0;
        const updateCounter = setInterval(() => {
          currentStep++;
          
          // Easing function for more natural animation
          const progress = currentStep / steps;
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          
          const newValue = Math.min(targetValue, Math.floor(targetValue * easedProgress));
          setCounterValue(newValue);
          
          if (currentStep >= steps) {
            clearInterval(updateCounter);
            startRealTimeCounter(targetValue);
          }
        }, interval);
      }
    }, options);

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">The Problem We're Solving</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Food waste is costing the industry billions annually while nutritional value is lost and environmental impact grows.
          </p>
        </div>

        <div className="waste-counter max-w-2xl mx-auto" ref={counterRef}>
          <h3 className="text-xl font-semibold mb-2">Blueberry Industry Annual Loss</h3>
          <div className="counter-value">
            ${Math.floor(counterValue).toLocaleString()}
          </div>
          <div className="counter-label">40-50% of all harvested berries are lost to spoilage</div>

          <div className="counter-bars">
            {[...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className={`counter-bar ${index < activeBars ? 'active' : ''}`}
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <div className="text-sm text-gray-700">Loss Per Minute</div>
              <div className="font-semibold text-blue-800">$5,897</div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <div className="text-sm text-gray-700">Loss Per Hour</div>
              <div className="font-semibold text-purple-800">$353,881</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            With Spanex Shelf Life Extender, we can reduce these losses by up to 75%.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoodWasteCounter;