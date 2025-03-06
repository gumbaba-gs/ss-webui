import React, { useState, useEffect, useRef } from 'react';
import './ComparisonSection.css';

const ComparisonSection = () => {
  const [selectedProduct, setSelectedProduct] = useState('berries');
  const [selectedMetrics, setSelectedMetrics] = useState(['shelfLife', 'organic', 'taste', 'application', 'cost', 'mechanism']);
  const [highlightedMethod, setHighlightedMethod] = useState('spanex');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Define product options
  const products = [
    { id: 'berries', name: 'Berries', icon: '🫐' },
    { id: 'apples', name: 'Apples', icon: '🍎' },
    { id: 'leafy', name: 'Leafy Greens', icon: '🥬', comingSoon: true },
    { id: 'citrus', name: 'Citrus', icon: '🍊', comingSoon: true },
  ];
  
  // Define preservation methods
  const methods = [
    { 
      id: 'spanex', 
      name: 'Spanex', 
      color: 'var(--primary-color)',
      lightColor: 'rgba(11, 61, 145, 0.1)',
      darkColor: '#0B3D91',
      description: 'Our revolutionary multi-mechanism preservation technology'
    },
    { 
      id: 'waxes', 
      name: 'Conventional Waxes', 
      color: 'var(--warning-color)',
      lightColor: 'rgba(234, 179, 8, 0.1)',
      darkColor: '#eab308',
      description: 'Traditional wax coatings used in the produce industry'
    },
    { 
      id: 'chemical', 
      name: 'Chemical Preservatives', 
      color: 'var(--error-color)',
      lightColor: 'rgba(239, 68, 68, 0.1)',
      darkColor: '#ef4444',
      description: 'Synthetic chemical solutions for extending shelf life'
    },
    { 
      id: 'map', 
      name: 'Modified Atmosphere', 
      color: 'var(--secondary-color)',
      lightColor: 'rgba(0, 128, 128, 0.1)',
      darkColor: '#008080',
      description: 'Controlled atmosphere packaging technologies'
    },
  ];
  
  // Define comparison metrics
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
  
  // Intersection observer for animation
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Custom styles with proper contrast
  const styles = {
    section: {
      background: 'linear-gradient(rgba(11, 61, 145, 0.9), rgba(0, 128, 128, 0.9))',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      padding: '3rem 0'
    },
    sectionTitle: {
      color: 'white',
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
      textAlign: 'center',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    sectionSubtitle: {
      color: 'white',
      fontSize: '1.1rem',
      opacity: 0.9,
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto 2rem'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem'
    },
    comparisonContainer: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      margin: '0 auto',
      maxWidth: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    },
    controlsSection: {
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    controlsRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    controlLabel: {
      color: 'white',
      fontWeight: 600,
      fontSize: '1.1rem',
      marginBottom: '0.5rem'
    },
    tabButton: (isActive) => ({
      padding: '0.75rem 1.25rem',
      background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
      border: '1px solid',
      borderColor: isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: isActive ? '600' : '400',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: isActive ? '0 0 15px rgba(0, 255, 255, 0.3)' : 'none'
    }),
    disabledTab: {
      opacity: '0.5',
      cursor: 'not-allowed'
    },
    methodsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    methodCard: (method, isHighlighted) => ({
      padding: '1.25rem',
      borderRadius: '0.75rem',
      background: isHighlighted ? `linear-gradient(135deg, ${method.color}, ${method.darkColor})` : 'rgba(255, 255, 255, 0.1)',
      border: '1px solid',
      borderColor: isHighlighted ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      boxShadow: isHighlighted ? '0 5px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
    }),
    methodName: {
      fontWeight: '600',
      fontSize: '1.1rem',
      marginBottom: '0.5rem'
    },
    methodDescription: {
      fontSize: '0.875rem',
      opacity: '0.9'
    },
    compareGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '2rem'
    },
    metricCard: (metric, isSelected) => ({
      padding: '1rem',
      borderRadius: '0.75rem',
      background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      border: '1px solid',
      borderColor: isSelected ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center',
      textAlign: 'center',
      boxShadow: isSelected ? '0 0 15px rgba(0, 255, 255, 0.3)' : 'none'
    }),
    metricIcon: {
      fontSize: '1.75rem',
      marginBottom: '0.5rem'
    },
    metricName: {
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    metricDescription: {
      fontSize: '0.8rem',
      opacity: '0.8',
      lineHeight: '1.3'
    },
    resultsContainer: {
      marginTop: '2.5rem'
    },
    resultsTitle: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    tableWrap: {
      overflowX: 'auto',
      borderRadius: '0.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.5rem',
      scrollbarWidth: 'thin',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
    },
    comparisonTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 4px',
      color: 'white'
    },
    tableHeader: (method, isHighlighted) => ({
      padding: '1rem',
      textAlign: 'center',
      background: isHighlighted ? `linear-gradient(135deg, ${method.color}, ${method.darkColor})` : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '600',
      borderTopLeftRadius: isHighlighted ? '0.5rem' : '0',
      borderTopRightRadius: isHighlighted ? '0.5rem' : '0',
      borderBottom: isHighlighted ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: isHighlighted ? '0 -2px 10px rgba(0, 0, 0, 0.1)' : 'none'
    }),
    firstColumn: {
      padding: '0.75rem',
      textAlign: 'left',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.5rem 0 0 0.5rem',
      fontWeight: '500'
    },
    metricCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    metricCellIcon: {
      fontSize: '1.25rem',
      opacity: '0.9'
    },
    metricCellName: {
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    valueCell: (method, isHighlighted) => ({
      padding: '0.75rem',
      textAlign: 'center',
      backgroundColor: isHighlighted ? method.lightColor : 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      borderLeft: '1px solid rgba(255, 255, 255, 0.05)'
    }),
    valueDisplay: (status) => {
      const baseStyle = {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '50px',
        fontWeight: '500',
        fontSize: '0.875rem'
      };
      
      if (status === 'comparison-good') {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(34, 197, 94, 0.15)',
          color: '#4ADE80',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        };
      } else if (status === 'comparison-medium') {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(234, 179, 8, 0.15)',
          color: '#FBBF24',
          border: '1px solid rgba(234, 179, 8, 0.3)'
        };
      } else {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#F87171',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        };
      }
    },
    footnote: {
      fontSize: '0.8rem',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      marginTop: '1.5rem'
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'center'
    },
    comingSoon: {
      fontSize: '0.7rem',
      background: 'rgba(234, 179, 8, 0.4)',
      color: 'white',
      padding: '0.2rem 0.5rem',
      borderRadius: '50px',
      marginLeft: '0.5rem'
    }
  };

  // For responsive design on larger screens
  const mediaStyles = {
    '@media (min-width: 768px)': {
      controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }
  };

  return (
    <section style={styles.section} id="comparison" ref={sectionRef}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Compare Preservation Methods</h2>
        <p style={styles.sectionSubtitle}>
          See how Spanex technology stacks up against traditional preservation methods
        </p>
        
        <div style={styles.comparisonContainer}>
          <div style={styles.controlsSection}>
            <div style={styles.controlsRow}>
              <div>
                <div style={styles.controlLabel}>Select Product:</div>
                <div style={styles.buttonGroup}>
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => !product.comingSoon && setSelectedProduct(product.id)}
                      style={product.comingSoon 
                        ? {...styles.tabButton(false), ...styles.disabledTab} 
                        : styles.tabButton(selectedProduct === product.id)
                      }
                      disabled={product.comingSoon}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{product.icon}</span>
                      {product.name}
                      {product.comingSoon && (
                        <span style={styles.comingSoon}>Coming Soon</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={styles.methodsGrid}>
              {methods.map(method => (
                <div
                  key={method.id}
                  style={styles.methodCard(method, highlightedMethod === method.id)}
                  onClick={() => setHighlightedMethod(method.id)}
                  onMouseEnter={() => setHighlightedMethod(method.id)}
                >
                  <div style={styles.methodName}>{method.name}</div>
                  <div style={styles.methodDescription}>{method.description}</div>
                </div>
              ))}
            </div>
            
            <div>
              <div style={styles.controlLabel}>Compare By:</div>
              <div style={styles.compareGrid}>
                {metrics.map(metric => (
                  <div
                    key={metric.id}
                    style={styles.metricCard(metric, selectedMetrics.includes(metric.id))}
                    onClick={() => toggleMetric(metric.id)}
                  >
                    <div style={styles.metricIcon}>{metric.icon}</div>
                    <div style={styles.metricName}>{metric.name}</div>
                    <div style={styles.metricDescription}>{metric.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={styles.resultsContainer}>
            <h3 style={styles.resultsTitle}>Comparison Results for {products.find(p => p.id === selectedProduct).name}</h3>
            
            <div style={styles.tableWrap}>
              <table style={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th style={{ padding: '1rem', background: 'transparent' }}></th>
                    {methods.map(method => (
                      <th 
                        key={method.id} 
                        style={styles.tableHeader(method, highlightedMethod === method.id)}
                      >
                        {method.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedMetrics.map(metricId => {
                    const metric = metrics.find(m => m.id === metricId);
                    
                    return (
                      <tr key={metricId}>
                        <td style={styles.firstColumn}>
                          <div style={styles.metricCell}>
                            <span style={styles.metricCellIcon}>{metric.icon}</span>
                            <span style={styles.metricCellName}>{metric.name}</span>
                          </div>
                        </td>
                        
                        {methods.map(method => {
                          const value = comparisonData[selectedProduct][method.id][metricId];
                          const otherValues = methods
                            .filter(m => m.id !== method.id)
                            .map(m => comparisonData[selectedProduct][m.id][metricId]);
                          
                          const comparisonClass = getComparisonClass(value, otherValues, metric);
                          
                          return (
                            <td 
                              key={`${metricId}-${method.id}`} 
                              style={styles.valueCell(method, highlightedMethod === method.id)}
                            >
                              <div style={styles.valueDisplay(comparisonClass)}>
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
            
            <p style={styles.footnote}>
              * Comparison data based on laboratory testing and industry standards. Actual results may vary depending on specific conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;