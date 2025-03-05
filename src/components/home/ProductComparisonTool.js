import React, { useState, useEffect } from 'react';

const ProductComparisonTool = () => {
  const [selectedProduct, setSelectedProduct] = useState('berries');
  const [selectedMetrics, setSelectedMetrics] = useState(['shelfLife', 'organic', 'taste', 'application', 'cost', 'mechanism']);
  const [highlightedMethod, setHighlightedMethod] = useState('spanex');
  const [animateValues, setAnimateValues] = useState(false);
  
  // Product types
  const products = [
    { id: 'berries', name: 'Berries', icon: '🫐' },
    { id: 'apples', name: 'Apples', icon: '🍎' },
    { id: 'leafy', name: 'Leafy Greens', icon: '🥬', comingSoon: true },
    { id: 'citrus', name: 'Citrus', icon: '🍊', comingSoon: true },
  ];
  
  // Preservation methods - Updated with theme colors
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
      return value ? 'bg-success-10 text-success' : 'bg-error-10 text-error';
    } else if (metric.valueType === 'rating') {
      const ratingValue = getRatingValue(value);
      const isHighest = !otherValues.some(v => getRatingValue(v) > ratingValue);
      
      if (metric.higherIsBetter) {
        return isHighest ? 'bg-success-10 text-success' : 'bg-warning-10 text-warning';
      } else {
        return isHighest ? 'bg-error-10 text-error' : 'bg-warning-10 text-warning';
      }
    } else if (metric.valueType === 'money') {
      // For cost, we need to extract the numeric values from strings like "$0.05-0.10"
      const extractLowValue = (str) => {
        const match = str.match(/\$(\d+\.\d+)-/);
        return match ? parseFloat(match[1]) : 9999;
      };
      
      const numericValue = extractLowValue(value);
      const isLowest = !otherValues.some(v => extractLowValue(v) < numericValue);
      
      return isLowest ? 'bg-success-10 text-success' : 'bg-warning-10 text-warning';
    } else if (metric.valueType === 'number') {
      // For numeric values like shelf life
      const numericOtherValues = otherValues.map(v => typeof v === 'string' ? parseFloat(v) : v);
      const isHighest = !numericOtherValues.some(v => v > value);
      
      return isHighest ? 'bg-success-10 text-success' : 'bg-warning-10 text-warning';
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
  
  // Reset animation state when product changes
  useEffect(() => {
    setAnimateValues(true);
    const timer = setTimeout(() => setAnimateValues(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedProduct]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-xl"
            style={{
              background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
              border: "1px solid rgba(0, 255, 255, 0.2)"
            }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text mb-2">Preservation Method Comparison</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Compare Spanex technology with traditional preservation methods across key performance metrics
        </p>
      </div>
      
      {/* Product selection */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3">Select Product:</h3>
        <div className="flex flex-wrap gap-3">
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => !product.comingSoon && setSelectedProduct(product.id)}
              className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                product.comingSoon
                  ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                  : selectedProduct === product.id
                    ? 'bg-primary text-background border-primary'
                    : 'bg-blue-100 border-border hover:border-primary text-text hover:text-primary'
              }`}
              disabled={product.comingSoon}
            >
              <span className="text-xl mr-2">{product.icon}</span>
              <span>{product.name}</span>
              {product.comingSoon && (
                <span className="ml-2 text-xs bg-warning-10 text-warning px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Metrics selection */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3">Compare By:</h3>
        <div className="flex flex-wrap gap-2">
          {metrics.map(metric => (
            <button
              key={metric.id}
              onClick={() => toggleMetric(metric.id)}
              className={`flex items-center px-3 py-1 rounded-full border transition-all ${
                selectedMetrics.includes(metric.id)
                  ? 'bg-primary-10 border-primary text-primary'
                  : 'bg-blue-100 border-border text-text hover:border-primary hover:text-primary'
              }`}
              title={metric.description}
            >
              <span className="mr-1">{metric.icon}</span>
              <span className="text-sm">{metric.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left bg-blue-100 border-b-2 border-border"></th>
              {methods.map(method => (
                <th 
                  key={method.id}
                  className={`p-3 text-center border-b-2 border-border ${
                    highlightedMethod === method.id ? method.color + ' text-background' : 'bg-blue-100'
                  }`}
                  onMouseEnter={() => setHighlightedMethod(method.id)}
                  onMouseLeave={() => setHighlightedMethod(null)}
                >
                  <div className="font-bold">{method.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedMetrics.map(metricId => {
              const metric = metrics.find(m => m.id === metricId);
              
              return (
                <tr key={metricId} className="hover:bg-blue-100">
                  <td className="p-3 border-b border-border">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{metric.icon}</span>
                      <div>
                        <div className="font-medium">{metric.name}</div>
                        <div className="text-xs text-gray-500">{metric.description}</div>
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
                        className={`p-3 text-center border-b border-border ${
                          isHighlighted ? 'bg-primary-10' : ''
                        }`}
                      >
                        <div className={`inline-block px-3 py-1 rounded-full ${comparisonClass} ${
                          animateValues ? 'transform transition-all duration-500 scale-110' : ''
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
      <div className="mt-6 flex flex-wrap items-center text-sm text-gray-600">
        <div className="mr-4 mb-2">
          <span className="inline-block w-3 h-3 rounded-full bg-success-10 mr-1"></span>
          Best performance
        </div>
        <div className="mr-4 mb-2">
          <span className="inline-block w-3 h-3 rounded-full bg-warning-10 mr-1"></span>
          Average performance
        </div>
        <div className="mr-4 mb-2">
          <span className="inline-block w-3 h-3 rounded-full bg-error-10 mr-1"></span>
          Poor performance
        </div>
      </div>
      
      {/* Interactive chart view */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-lg font-bold mb-6">Performance Radar Chart</h3>
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg h-64 flex items-center justify-center">
            {/* Central point */}
            <div className="absolute z-10 w-4 h-4 bg-gray-200 rounded-full"></div>
            
            {/* Axes */}
            {selectedMetrics.map((metricId, index) => {
              const metric = metrics.find(m => m.id === metricId);
              const angleStep = (2 * Math.PI) / selectedMetrics.length;
              const angle = index * angleStep - Math.PI / 2;
              
              return (
                <div 
                  key={metricId}
                  className="absolute w-full h-0.5 bg-gray-200 origin-center"
                  style={{
                    transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                  }}
                >
                  <div 
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    style={{
                      transform: `rotate(-${angle * (180 / Math.PI)}deg) translate(120px, 0)`,
                    }}
                  >
                    {metric.icon} {metric.name}
                  </div>
                </div>
              );
            })}
            
            {/* Circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
              <div 
                key={scale}
                className="absolute border border-gray-200 rounded-full"
                style={{
                  width: `${scale * 200}px`,
                  height: `${scale * 200}px`,
                }}
              ></div>
            ))}
            
            {/* Data polygons */}
            {methods.map(method => {
              // Skip if not highlighted and some method is highlighted
              if (highlightedMethod && highlightedMethod !== method.id) {
                return null;
              }
              
              // Create polygon points
              const points = selectedMetrics.map((metricId, index) => {
                const metric = metrics.find(m => m.id === metricId);
                const value = comparisonData[selectedProduct][method.id][metricId];
                const angleStep = (2 * Math.PI) / selectedMetrics.length;
                const angle = index * angleStep - Math.PI / 2;
                
                // Normalize the value to 0-1 scale
                let normalizedValue;
                if (metric.valueType === 'boolean') {
                  normalizedValue = value ? 1 : 0.3;
                } else if (metric.valueType === 'rating') {
                  const ratingValue = getRatingValue(value);
                  normalizedValue = ratingValue / 5;
                } else if (metric.valueType === 'money') {
                  // Extract low value from cost range
                  const match = value.match(/\$(\d+\.\d+)-/);
                  const lowValue = match ? parseFloat(match[1]) : 0;
                  // Invert the scale since lower cost is better
                  normalizedValue = 1 - (lowValue / 0.5); // Assuming max is $0.50
                } else if (metric.valueType === 'number') {
                  // Normalize based on maximum possible value (assuming 4x)
                  normalizedValue = value / 4;
                }
                
                // Cap between 0.1 and 1
                normalizedValue = Math.max(0.1, Math.min(1, normalizedValue));
                
                // Calculate point position
                const radius = normalizedValue * 100;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return `${x},${y}`;
              }).join(' ');
              
              return (
                <svg 
                  key={method.id} 
                  className="absolute inset-0 w-full h-full"
                  viewBox="-100 -100 200 200"
                  style={{ opacity: 0.7 }}
                >
                  <polygon 
                    points={points} 
                    className={`${method.color} fill-current`} 
                    style={{ opacity: 0.5 }}
                  />
                  <polyline 
                    points={points} 
                    className={`${method.textColor} stroke-current`}
                    style={{ fill: 'none', strokeWidth: 2 }}
                  />
                  {selectedMetrics.map((metricId, index) => {
                    const metric = metrics.find(m => m.id === metricId);
                    const value = comparisonData[selectedProduct][method.id][metricId];
                    const angleStep = (2 * Math.PI) / selectedMetrics.length;
                    const angle = index * angleStep - Math.PI / 2;
                    
                    // Normalize the value as before
                    let normalizedValue;
                    if (metric.valueType === 'boolean') {
                      normalizedValue = value ? 1 : 0.3;
                    } else if (metric.valueType === 'rating') {
                      const ratingValue = getRatingValue(value);
                      normalizedValue = ratingValue / 5;
                    } else if (metric.valueType === 'money') {
                      const match = value.match(/\$(\d+\.\d+)-/);
                      const lowValue = match ? parseFloat(match[1]) : 0;
                      normalizedValue = 1 - (lowValue / 0.5);
                    } else if (metric.valueType === 'number') {
                      normalizedValue = value / 4;
                    }
                    
                    normalizedValue = Math.max(0.1, Math.min(1, normalizedValue));
                    
                    // Calculate point position
                    const radius = normalizedValue * 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <circle 
                        key={`${method.id}-${metricId}`}
                        cx={x} 
                        cy={y} 
                        r="4" 
                        className={`${method.color} fill-current`} 
                      />
                    );
                  })}
                </svg>
              );
            })}
          </div>
        </div>
        
        {/* Legend for radar chart */}
        <div className="flex justify-center mt-6 flex-wrap gap-4">
          {methods.map(method => (
            <div 
              key={method.id}
              className="flex items-center cursor-pointer"
              onMouseEnter={() => setHighlightedMethod(method.id)}
              onMouseLeave={() => setHighlightedMethod(null)}
            >
              <div className={`w-4 h-4 rounded-full ${method.color} mr-2`}></div>
              <span className={highlightedMethod === method.id ? method.textColor : ''}>
                {method.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footnote */}
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>*Data based on laboratory testing and field trials. Results may vary based on specific conditions.</p>
        <p>**Hover over method names to highlight specific technologies in the comparison.</p>
      </div>
    </div>
  );
};

export default ProductComparisonTool;