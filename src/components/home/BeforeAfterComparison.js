import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

const BeforeAfterComparison = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">See the Difference</h2>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Blueberry Shelf-Life Comparison</h2>
          <p className="text-gray-600 mb-6 text-center"></p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Drag the slider to compare Spanex-treated blueberries (left) vs untreated (right) after
            <BeforeAfterSlider />
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterComparison;