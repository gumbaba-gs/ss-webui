import React, { useEffect, useState, useRef } from 'react';
import './FoodWasteCounter.css';

const FoodWasteCounter = () => {
  const [counterValue, setCounterValue] = useState(0);
  const [activeBars, setActiveBars] = useState(5);
  const [isVisible, setIsVisible] = useState(false);
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

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsVisible(true);
        
        if (!hasAnimated.current) {
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
      } else {
        setIsVisible(false);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  // Import the image
  // Note: You would typically put this at the top of the file
  // import heroBackground from '../../images/hero-bg2.jpg';
  
  return (
    <section className="food-waste-section" id="problem">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Problem We're Solving</h2>
          <p className="section-subtitle">
            Food waste is costing the industry billions annually while nutritional value is lost and environmental impact grows.
          </p>
        </div>

        <div 
          className={`waste-counter ${isVisible ? 'visible' : ''}`} 
          ref={counterRef}
        >
          <h3 className="counter-title">
            Fruits and Vegetables Industry Annual Loss
          </h3>
          
          <div className="counter-value">
            ${Math.floor(counterValue).toLocaleString()}
          </div>
          
          <div className="counter-label">
            40-50% of all harvested berries are lost to spoilage
          </div>

          <div className="counter-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`counter-bar ${index < activeBars ? 'active' : ''}`}
              ></div>
            ))}
          </div>

          <div className="counter-metrics">
            <div className="counter-metric">
              <div className="metric-label">Loss Per Minute</div>
              <div className="metric-value">$5,897</div>
            </div>
            
            <div className="counter-metric">
              <div className="metric-label">Loss Per Hour</div>
              <div className="metric-value">$353,881</div>
            </div>
          </div>

          <p className="counter-message">
            With Spanex Shelf Life Extender, we can reduce these losses by up to 75%.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoodWasteCounter;