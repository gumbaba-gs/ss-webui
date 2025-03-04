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
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-25 to-gray-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgxNnYxNkgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik04IDBjNC40yAwIDggMy41OCA4IDh2MWgtMS41M2ExLjQ3IDEuNDcgMCAwIDAtMS4wNi0uNDRjLS4zMyAwLS42NS4xMS0uOTEuMzFsLTIuMzQgMS44OGExLjQ3IDEuNDcgMCAwIDAtLjU0IDEuMTh2Mi4yNmMwIC4yLjA3LjM5LjE5LjU1bDEuNDggMS45OGExLjQ3IDEuNDcgMCAwIDEgLjM0IDEuMDd2Mi4yNmMwIC40Ni4zLjg1LjcxLjk3bDEuODkuNjNjLjQzLjE0LjkwLjAzIDEuMi0uMjkuMjgtLjI5LjQyLS42OC4zNy0xLjA3VjE0LjljLjA5LS40NS4zOC0uODQuNzgtMS4wMmwKMS4zOS0uNjljLjQ2LS4yMy43Ni0uNy43Ni0xLjIxVjhjMC00LjQyLTMuNTgtOC04LTh6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]">
      {/* Image section added above content */}
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <img
          src="/images/waste-stats-graphic.webp"
          alt="Food waste statistics visualization"
          className="w-full h-auto rounded-2xl shadow-lg"
          loading="lazy"
          srcSet="/images/waste-stats-graphic-400.webp 400w,
                  /images/waste-stats-graphic-800.webp 800w,
                  /images/waste-stats-graphic-1200.webp 1200w"
          sizes="(max-width: 640px) 100vw, 80vw"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-5 text-gray-800 leading-tight">
            The Problem We're Solving
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Food waste is costing the industry billions annually while nutritional value is lost and environmental impact grows.
          </p>
        </div>

        <div className="waste-counter max-w-2xl mx-auto" ref={counterRef}>
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-700">
            Fruits and Vegetables Industry Annual Loss
          </h3>
          <div
            className="counter-value text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
          >
            ${Math.floor(counterValue).toLocaleString()}
          </div>
          <div className="counter-label text-sm md:text-base text-gray-600 mt-2 md:mt-3">
            40-50% of all harvested berries are lost to spoilage
          </div>

          <div className="counter-bars mt-6 md:mt-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`counter-bar ${index < activeBars ? 'active' : ''}`}
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mt-6 md:mt-8">
            <div className="bg-blue-100 p-4 md:p-5 rounded-xl space-y-2">
              <div className="text-xs md:text-sm text-gray-600">Loss Per Minute</div>
              <div className="font-semibold text-blue-800 text-lg md:text-xl">$5,897</div>
            </div>
            <div className="bg-purple-100 p-4 md:p-5 rounded-xl space-y-2">
              <div className="text-xs md:text-sm text-gray-600">Loss Per Hour</div>
              <div className="font-semibold text-purple-800 text-lg md:text-xl">$353,881</div>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-600 mt-6 md:mt-8 leading-relaxed">
            With Spanex Shelf Life Extender, we can reduce these losses by up to 75%.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoodWasteCounter;