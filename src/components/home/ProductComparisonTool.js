import React, { useState, useEffect, useRef } from 'react';
import './ProductComparisonTool.css';

const ProductComparisonTool = () => {
  const [selectedProduct, setSelectedProduct] = useState('berries');
  const [selectedMetrics, setSelectedMetrics] = useState(['shelfLife', 'organic', 'taste', 'application', 'cost', 'mechanism']);
  const [highlightedMethod, setHighlightedMethod] = useState('spanex');
  const [animateValues, setAnimateValues] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  // Product types
  const products = [
    { id: 'berries', name: 'Berries', icon: '🫐' },
    { id: 'apples', name: 'Apples', icon: '🍎' },
    { id: 'leafy', name: 'Leafy Greens', icon: '🥬', comingSoon: true },
    { id: 'citrus', name: 'Citrus', icon: '🍊', comingSoon: true },
  ];
  
  // Preservation methods with theme colors
  const methods = [
    { id: 'spanex', name: 'Spanex', color: 'bg-primary', textColor: 'text-primary' },
    { id: 'waxes', name: 'Conventional Waxes', color: 'bg-warning', textColor: 'text-warning' },
    { id: 'chemical', name: 'Chemical Preservatives', color: 'bg-error', textColor: 'text-error' },
    { id: 'map', name: 'Modified Atmosphere', color: 'bg-secondary', textColor: 'text-secondary' },
  ];
  
  // Metrics for comparison
  const metrics = [
    { 
      id: 'shelfLife', 
      name: 'Shelf-Life Extension', 
      icon: '⏱️',
      description: 'How many times longer the produce stays fresh compared to untreated',
      higherIsBetter: true,
      unit: 'x',
      valueType: 'number',
    },
    { 
      id: 'organic', 
      name: 'Organic Compatible', 
      icon: '🌱',
      description: 'Whether the solution can be used on organic certified produce',
      higherIsBetter: true,
      valueType: 'boolean',
    },
    { 
      id: 'taste', 
      name: 'Taste Impact', 
      icon: '👅',
      description: 'Effect on the natural taste and texture of the produce',
      higherIsBetter: false,
      valueType: 'rating',
    },
    { 
      id: 'application', 
      name: 'Application Ease', 
      icon: '🔧',
      description: 'How easy it is to apply at commercial scale',
      higherIsBetter: true,
      valueType: 'rating',
    },
    { 
      id: 'cost', 
      name: 'Cost-Effectiveness', 
      icon: '💰',
      description: 'Relative cost per ton of produce treated',
      higherIsBetter: true,
      valueType: 'money',
      unit: '/ton',
    },
    { 
      id: 'mechanism', 
      name: 'Multi-Mechanism', 
      icon: '⚙️',
      description: 'Whether the solution addresses multiple preservation needs simultaneously',
      higherIsBetter: true,
      valueType: 'boolean',
    },
  ];
  
  // Comparison data for each product and preservation method
  const comparisonData = {
    berries: {
      spanex: {
        shelfLife: 3.5,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: '$0.05-0.10',
        mechanism: true,
      },
      waxes: {
        shelfLife: 1.5,
        organic: false,
        taste: 'MODERATE',
        application: 'MODERATE',
        cost: '$0.15-0.25',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.5,
        organic: false,
        taste: 'SIGNIFICANT',
        application: 'HIGH',
        cost: '$0.05-0.15',
        mechanism: false,
      },
      map: {
        shelfLife: 2.0,
        organic: true,
        taste: 'MINIMAL',
        application: 'LOW',
        cost: '$0.30-0.50',
        mechanism: false,
      },
    },
    apples: {
      spanex: {
        shelfLife: 3.0,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: '$0.04-0.08',
        mechanism: true,
      },
      waxes: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MODERATE',
        application: 'HIGH',
        cost: '$0.10-0.20',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.5,
        organic: false,
        taste: 'MODERATE',
        application: 'HIGH',
        cost: '$0.06-0.12',
        mechanism: false,
      },
      map: {
        shelfLife: 2.5,
        organic: true,
        taste: 'MINIMAL',
        application: 'LOW',
        cost: '$0.25-0.40',
        mechanism: false,
      },
    },
    leafy: {
      spanex: {
        shelfLife: 3.0,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: '$0.06-0.12',
        mechanism: true,
      },
      waxes: {
        shelfLife: 1.2,
        organic: false,
        taste: 'SIGNIFICANT',
        application: 'LOW',
        cost: '$0.20-0.30',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MODERATE',
        application: 'MODERATE',
        cost: '$0.08-0.15',
        mechanism: false,
      },
      map: {
        shelfLife: 2.5,
        organic: true,
        taste: 'MINIMAL',
        application: 'MODERATE',
        cost: '$0.20-0.35',
        mechanism: false,
      },
    },
    citrus: {
      spanex: {
        shelfLife: 2.5,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: '$0.04-0.09',
        mechanism: true,
      },
      waxes: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MINIMAL',
        application: 'HIGH',
        cost: '$0.08-0.15',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MODERATE',
        application: 'HIGH',
        cost: '$0.05-0.12',
        mechanism: false,
      },
      map: {
        shelfLife: 1.8,
        organic: true,
        taste: 'MINIMAL',
        application: 'LOW',
        cost: '$0.25-0.40',
        mechanism: false,
      },
    },
  };
  
  // Helper function to evaluate ratings
  const getRatingValue = (rating) => {
    const ratings = { 'NONE': 5, 'MINIMAL': 4, 'MODERATE': 3, 'SIGNIFICANT': 2, 'SEVERE': 1 };
    return ratings[rating] || 0;
  };
  
  // Helper function to format values for display
  const formatValue = (value, metric) => {
    if (metric.valueType === 'boolean') {
      return value ? 'YES' : 'LIMITED';
    } else if (metric.valueType === 'rating') {
      return value;
    } else if (metric.valueType === 'number') {
      return value + (metric.unit || '');
    } else {
      return value;
    }
  };
  
  // Helper function to get color class based on value comparison
  const getComparisonClass = (value, otherValues, metric) => {
    if (metric.valueType === 'boolean') {
      return value ? 'comparison-good' : 'comparison-poor';
    } else if (metric.valueType === 'rating') {
      const ratingValue = getRatingValue(value);
      const isHighest = !otherValues.some(v => getRatingValue(v) > ratingValue);
      
      if (metric.higherIsBetter) {
        return isHighest ? 'comparison-good' : 'comparison-medium';
      } else {
        return isHighest ? 'comparison-poor' : 'comparison-medium';
      }
    } else if (metric.valueType === 'money') {
      // For cost, we need to extract the numeric values from strings like "$0.05-0.10"
      const extractLowValue = (str) => {
        const match = str.match(/\$(\d+\.\d+)-/);
        return match ? parseFloat(match[1]) : 9999;
      };
      
      const numericValue = extractLowValue(value);
      const isLowest = !otherValues.some(v => extractLowValue(v) < numericValue);
      
      return isLowest ? 'comparison-good' : 'comparison-medium';
    } else if (metric.valueType === 'number') {
      // For numeric values like shelf life
      const numericOtherValues = otherValues.map(v => typeof v === 'string' ? parseFloat(v) : v);
      const isHighest = !numericOtherValues.some(v => v > value);
      
      return isHighest ? 'comparison-good' : 'comparison-medium';
    }
    
    return '';
  };
  
  // Toggle a metric selection
  const toggleMetric = (metricId) => {
    if (selectedMetrics.includes(metricId)) {
      if (selectedMetrics.length > 1) { // Ensure at least one metric is selected
        setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };
  
  // Setup intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Reset animation state when product changes
  useEffect(() => {
    setAnimateValues(true);
    const timer = setTimeout(() => setAnimateValues(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedProduct]);

  return (
    <div 
      ref={containerRef}
      className={`comparison-tool ${isVisible ? 'visible' : ''}`}
    >
      <div className="product-selector">
        <h3 className="selector-title">Select Product:</h3>
        <div className="product-buttons">
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => !product.comingSoon && setSelectedProduct(product.id)}
              className={`product-button ${
                product.comingSoon ? 'coming-soon' : selectedProduct === product.id ? 'active' : ''
              }`}
              disabled={product.comingSoon}
            >
              <span className="product-icon">{product.icon}</span>
              <span className="product-name">{product.name}</span>
              {product.comingSoon && (
                <span className="coming-soon-badge">Coming Soon</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="metrics-selector">
        <h3 className="selector-title">Compare By:</h3>
        <div className="metrics-buttons">
          {metrics.map(metric => (
            <button
              key={metric.id}
              onClick={() => toggleMetric(metric.id)}
              className={`metric-button ${selectedMetrics.includes(metric.id) ? 'active' : ''}`}
              title={metric.description}
            >
              <span className="metric-icon">{metric.icon}</span>
              <span className="metric-name">{metric.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Comparison table - responsive version */}
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="method-header empty-header"></th>
              {methods.map(method => (
                <th 
                  key={method.id}
                  className={`method-header ${
                    highlightedMethod === method.id ? method.color + ' highlighted' : ''
                  }`}
                  onMouseEnter={() => setHighlightedMethod(method.id)}
                  onMouseLeave={() => setHighlightedMethod(null)}
                >
                  <div className="method-name">{method.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedMetrics.map(metricId => {
              const metric = metrics.find(m => m.id === metricId);
              
              return (
                <tr key={metricId} className="metric-row">
                  <td className="metric-cell">
                    <div className="metric-info">
                      <span className="metric-cell-icon">{metric.icon}</span>
                      <div className="metric-cell-text">
                        <div className="metric-cell-name">{metric.name}</div>
                        <div className="metric-cell-description">{metric.description}</div>
                      </div>
                    </div>
                  </td>
                  
                  {methods.map(method => {
                    const value = comparisonData[selectedProduct][method.id][metricId];
                    const otherValues = methods
                      .filter(m => m.id !== method.id)
                      .map(m => comparisonData[selectedProduct][m.id][metricId]);
                    
                    const comparisonClass = getComparisonClass(value, otherValues, metric);
                    
                    const isHighlighted = 
                      highlightedMethod === method.id || 
                      (!highlightedMethod && method.id === 'spanex');
                    
                    return (
                      <td 
                        key={`${metricId}-${method.id}`} 
                        className={`value-cell ${isHighlighted ? 'highlighted' : ''}`}
                      >
                        <div className={`value-display ${comparisonClass} ${
                          animateValues ? 'animate' : ''
                        }`}>
                          {formatValue(value, metric)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="comparison-legend">
        <div className="legend-item">
          <span className="legend-color good"></span>
          <span className="legend-text">Best performance</span>
        </div>
        <div className="legend-item">
          <span className="legend-color medium"></span>
          <span className="legend-text">Average performance</span>
        </div>
        <div className="legend-item">
          <span className="legend-color poor"></span>
          <span className="legend-text">Poor performance</span>
        </div>
      </div>
      
      {/* Radar chart */}
      <div className="radar-chart-section">
        <h3 className="chart-title">Performance Radar Chart</h3>
        <div className="radar-chart">
          <div className="radar-placeholder">
            <p>Interactive radar chart visualization would appear here, showing the selected preservation methods across all metrics.</p>
            <p>The chart would dynamically update as users select different products and metrics.</p>
          </div>
        </div>
        
        {/* Method legend for chart */}
        <div className="chart-legend">
          {methods.map(method => (
            <div 
              key={method.id}
              className={`chart-legend-item ${highlightedMethod === method.id ? 'highlighted' : ''}`}
              onMouseEnter={() => setHighlightedMethod(method.id)}
              onMouseLeave={() => setHighlightedMethod(null)}
            >
              <span className={`legend-color ${method.color}`}></span>
              <span className={`legend-text ${highlightedMethod === method.id ? method.textColor : ''}`}>
                {method.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footnote */}
      <div className="comparison-footnote">
        <p>*Data based on laboratory testing and field trials. Results may vary based on specific conditions.</p>
        <p>**Hover over method names to highlight specific technologies in the comparison.</p>
      </div>
    </div>
  );
};

export default ProductComparisonTool;