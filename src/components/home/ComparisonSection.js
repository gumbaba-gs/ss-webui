import React from 'react';
import ProductComparisonTool from './ProductComparisonTool';

const ComparisonSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Compare Preservation Methods</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how Spanex technology stacks up against traditional preservation methods
          </p>
        </div>

        <ProductComparisonTool />
      </div>
    </section>
  );
};

export default ComparisonSection;