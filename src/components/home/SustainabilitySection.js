import React from 'react';
import SustainabilityDashboard from './SustainabilityDashboard';
import './SustainabilitySection.css';

const SustainabilitySection = () => {
  return (
    <section className="sustainability-section" id="impact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Environmental Impact</h2>
          <p className="section-subtitle">
            Explore how Spanex technology reduces food waste, carbon emissions, water usage, and packaging
          </p>
        </div>

        <SustainabilityDashboard />
      </div>
    </section>
  );
};

export default SustainabilitySection;