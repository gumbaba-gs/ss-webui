import React from 'react';
import SustainabilityDashboard from './SustainabilityDashboard';

const SustainabilitySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Environmental Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore how Spanex technology reduces food waste, carbon emissions, water usage, and packaging
          </p>
        </div>

        <SustainabilityDashboard />
      </div>
    </section>
  );
};

export default SustainabilitySection;