import React, { useEffect, useState, useRef } from 'react';
import './FoodWasteCounter.css';

const FoodWasteCounter = () => {
  const [counterValue, setCounterValue] = useState(0);
  const [activeBars, setActiveBars] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);
  const [isCounterVisible, setIsCounterVisible] = useState(false);

  // Define the startRealTimeCounter function
  const startRealTimeCounter = (baseValue) => {
    const perSecond = baseValue / (365 * 24 * 60 * 60);
    const updateInterval = 100; // ms

    const intervalId = setInterval(() => {
      setCounterValue(prev => {
        const newValue = prev + perSecond * (updateInterval / 1000);
        
        // Update active bars based on progress
        const newActiveBars = Math.min(8, Math.floor((newValue - baseValue) / 10000000) + 1);
        if (newActiveBars !== activeBars) {
          setActiveBars(newActiveBars);
        }
        
        return newValue;
      });
    }, updateInterval);

    return intervalId; // Return the interval ID for cleanup
  };

  // Setup intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Add slight delay before showing counter for better UX
          setTimeout(() => {
            setIsCounterVisible(true);
          }, 300);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  // Animation and counter logic
  useEffect(() => {
    if (!isCounterVisible) return;

    if (!hasAnimated.current) {
      hasAnimated.current = true;
      
      const targetValue = 3100000000; // $3.1 billion
      const duration = 2000; // 2 seconds
      const interval = 50; // update every 50ms
      const steps = duration / interval;
      
      let currentStep = 0;
      
      const updateCounter = setInterval(() => {
        currentStep++;
        
        // Easing function for more natural animation
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const newValue = Math.min(targetValue, Math.floor(targetValue * easedProgress));
        setCounterValue(newValue);
        
        // Update active bars based on progress
        const progressPercent = currentStep / steps;
        const newActiveBars = Math.min(5, Math.ceil(progressPercent * 5));
        setActiveBars(newActiveBars);
        
        if (currentStep >= steps) {
          clearInterval(updateCounter);
          
          // Start real-time counter after initial animation
          const intervalId = startRealTimeCounter(targetValue);
          
          // Clean up the interval when component unmounts
          return () => clearInterval(intervalId);
        }
      }, interval);
      
      // Clean up the interval when component unmounts or dependencies change
      return () => clearInterval(updateCounter);
    }
  }, [isCounterVisible]);

  // Format the counter value with commas for thousands separators
  const formatCurrency = (value) => {
    return '$' + Math.floor(value).toLocaleString();
  };

  return (
    <section className="foodwaste-section" id="problem">
      {/* Section header outside the main container */}
      <div className="foodwaste-section__header">
        <h2 className="foodwaste-section__title">The Problem We're Solving</h2>
        <p className="foodwaste-section__subtitle">
          Food waste is costing the industry billions annually while nutritional value is lost and environmental impact grows.
        </p>
      </div>

      <div className="foodwaste-section__container">
        <div 
          ref={counterRef}
          className={`foodwaste-section__counter ${isCounterVisible ? 'visible' : ''}`}
        >
          <h3 className="foodwaste-section__counter-title">
            Fruits and Vegetables Industry Annual Loss
          </h3>
          
          <div className="foodwaste-section__amount-container">
            <div className={`foodwaste-section__amount ${isCounterVisible ? 'animate' : ''}`}>
              {formatCurrency(counterValue)}
            </div>
          </div>
          
          <p className="foodwaste-section__label">
            40-50% of all harvested berries are lost to spoilage
          </p>

          {/* Counter metrics - Loss per minute and hour */}
          <div className="foodwaste-section__metrics">
            <div className="foodwaste-section__metric">
              <div className="foodwaste-section__metric-label">Loss Per Minute</div>
              <div className="foodwaste-section__metric-value">$5,897</div>
            </div>
            
            <div className="foodwaste-section__metric">
              <div className="foodwaste-section__metric-label">Loss Per Hour</div>
              <div className="foodwaste-section__metric-value">$353,881</div>
            </div>
          </div>

          {/* Indicator bars */}
          {/* <div className="foodwaste-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`foodwaste-section__indicator-bar ${
                  index < activeBars ? 'foodwaste-section__indicator-bar--active' : ''
                }`}
              ></div>
            ))}
          </div> */}

          <p className="foodwaste-section__message">
            With Spanex Shelf Life Extender, we can reduce these losses by up to 75%.
          </p>
        </div>

        {/* CTA/Footnote section */}
        <div className="foodwaste-section__footnote">
          <p className="foodwaste-section__footnote-text">
            Our innovative preservation technology can save the industry billions while reducing food waste and environmental impact.
          </p>
          
          {/* <a href="#products" className="foodwaste-section__cta">
            Explore Our Solutions
          </a> */}
          
          {/* Indicator bars in footer */}
          <div className="foodwaste-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`foodwaste-section__indicator-bar ${
                  index < 5 ? 'foodwaste-section__indicator-bar--active' : ''
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodWasteCounter;