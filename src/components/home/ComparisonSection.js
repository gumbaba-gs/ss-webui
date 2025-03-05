import React from 'react';
import ProductComparisonTool from './ProductComparisonTool';
import './ComparisonSection.css';

const ComparisonSection = () => {
  return (
    <section className="comparison-section" id="comparison">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Compare Preservation Methods</h2>
          <p className="section-subtitle">
            See how Spanex technology stacks up against traditional preservation methods
          </p>
        </div>

        <ProductComparisonTool />
      </div>
    </section>
  );
};

export default ComparisonSection;