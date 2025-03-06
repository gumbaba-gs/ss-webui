import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import './BeforeAfterComparison.css';

const BeforeAfterComparison = () => {
  return (
    <section className="before-after-section" id="results">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">See the Difference</h2>
          <h3 className="section-subtitle">Blueberry Shelf-Life Comparison</h3>
         
        </div>
        
        {/* Slider is now embedded directly without additional paragraph wrapper */}
        <BeforeAfterSlider />
      </div>
    </section>
  );
};

export default BeforeAfterComparison;