import React, { useState, useEffect, useRef } from 'react';
import './ComparisonSection.css';

const ComparisonSection = () => {
  const [selectedProduct, setSelectedProduct] = useState('berries');
  const [highlightedMethod, setHighlightedMethod] = useState('spanex');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Use window inner width for responsive layouts
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      shortName: 'Spanex',
      color: 'var(--primary-color)',
      lightColor: 'rgba(11, 61, 145, 0.1)',
      darkColor: '#0B3D91',
      description: 'Our revolutionary multi-mechanism preservation technology'
    },
    { 
      id: 'waxes', 
      name: 'Conventional Waxes', 
      shortName: 'Waxes',
      color: 'var(--warning-color)',
      lightColor: 'rgba(234, 179, 8, 0.1)',
      darkColor: '#eab308',
      description: 'Traditional wax coatings used in the produce industry'
    },
    { 
      id: 'chemical', 
      name: 'Chemical Preservatives', 
      shortName: 'Chemical',
      color: 'var(--error-color)',
      lightColor: 'rgba(239, 68, 68, 0.1)',
      darkColor: '#ef4444',
      description: 'Synthetic chemical solutions for extending shelf life'
    },
    { 
      id: 'map', 
      name: 'Modified Atmosphere', 
      shortName: 'MAP',
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
      valueType: 'rating',
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
        cost: 'LOW',
        mechanism: true,
      },
      waxes: {
        shelfLife: 1.5,
        organic: false,
        taste: 'MODERATE',
        application: 'MODERATE',
        cost: 'HIGH',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.5,
        organic: false,
        taste: 'SIGNIFICANT',
        application: 'HIGH',
        cost: 'LOW',
        mechanism: false,
      },
      map: {
        shelfLife: 2.0,
        organic: true,
        taste: 'MINIMAL',
        application: 'LOW',
        cost: 'MODERATE',
        mechanism: false,
      },
    },
    apples: {
      spanex: {
        shelfLife: 3.0,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: 'LOW',
        mechanism: true,
      },
      waxes: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MODERATE',
        application: 'HIGH',
        cost: 'HIGH',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.5,
        organic: false,
        taste: 'MODERATE',
        application: 'HIGH',
        cost: 'LOW',
        mechanism: false,
      },
      map: {
        shelfLife: 2.5,
        organic: true,
        taste: 'MINIMAL',
        application: 'LOW',
        cost: 'MODERATE',
        mechanism: false,
      },
    },
    leafy: {
      spanex: {
        shelfLife: 3.0,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: 'LOW',
        mechanism: true,
      },
      waxes: {
        shelfLife: 1.2,
        organic: false,
        taste: 'SIGNIFICANT',
        application: 'LOW',
        cost: 'HIGH',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MODERATE',
        application: 'MODERATE',
        cost: 'LOW',
        mechanism: false,
      },
      map: {
        shelfLife: 2.5,
        organic: true,
        taste: 'MINIMAL',
        application: 'MODERATE',
        cost: 'MODERATE',
        mechanism: false,
      },
    },
    citrus: {
      spanex: {
        shelfLife: 2.5,
        organic: true,
        taste: 'NONE',
        application: 'HIGH',
        cost: 'LOW',
        mechanism: true,
      },
      waxes: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MINIMAL',
        application: 'HIGH',
        cost: 'HIGH',
        mechanism: false,
      },
      chemical: {
        shelfLife: 2.0,
        organic: false,
        taste: 'MODERATE',
        application: 'HIGH',
        cost: 'LOW',
        mechanism: false,
      },
      map: {
        shelfLife: 1.8,
        organic: true,
        taste: 'MINIMAL',
        application: 'LOW',
        cost: 'MODERATE',
        mechanism: false,
      },
    },
  };
  
  // Helper function to evaluate ratings for standard metrics
  // For taste impact, NONE or MINIMAL is good (less impact is better)
  const getRatingValue = (rating) => {
    const ratings = { 'NONE': 5, 'MINIMAL': 4, 'MODERATE': 3, 'SIGNIFICANT': 2, 'SEVERE': 1 };
    return ratings[rating] || 0;
  };
  
  // Helper function for cost ratings - reversed scale for cost
  // For cost, LOW is good, HIGH is bad
  const getCostValue = (rating) => {
    const ratings = { 'LOW': 5, 'MODERATE': 3, 'HIGH': 1 };
    return ratings[rating] || 0;
  };
  
  // Helper function to format values for display
  const formatValue = (value, metric) => {
    if (metric.valueType === 'boolean') {
      return value ? 'YES' : 'NO';
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
    // Handle specific metrics by ID
    if (metric.id === 'application') {
      // For application ease, HIGH is good
      // Direct mapping for application values
      if (value === 'HIGH') {
        return 'comparison-good';
      } else if (value === 'MODERATE') {
        return 'comparison-medium';
      } else {
        return 'comparison-poor';
      }
    }
    
    if (metric.id === 'cost') {
      // For cost, LOW is good
      // Direct mapping for cost values
      if (value === 'LOW') {
        return 'comparison-good';
      } else if (value === 'MODERATE') {
        return 'comparison-medium';
      } else {
        return 'comparison-poor';
      }
    }
    
    if (metric.id === 'taste') {
      // For taste, NONE/MINIMAL is good (less impact is better)
      const ratingValue = getRatingValue(value);
      const isHighest = !otherValues.some(v => getRatingValue(v) > ratingValue);
      return isHighest ? 'comparison-good' : (ratingValue >= 3 ? 'comparison-medium' : 'comparison-poor');
    }
    
    // Handle standard metric types
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
    } else if (metric.valueType === 'number') {
      // For numeric values like shelf life
      const numericOtherValues = otherValues.map(v => typeof v === 'string' ? parseFloat(v) : v);
      const isHighest = !numericOtherValues.some(v => v > value);
      
      return isHighest ? 'comparison-good' : 'comparison-medium';
    }
    
    return '';
  };

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
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
  // Styles for comparison container and its content
  const styles = {
    methodComparisonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0.75rem',
      marginTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '1rem',
      width: '100%'
    },
    mediaQueries: {
      mobile: {
        methodComparisonGrid: {
          gridTemplateColumns: 'repeat(2, 1fr)'
        }
      }
    },
    comparisonContainer: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      borderRadius: '0.75rem',
      padding: '2rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)',
      border: '1px solid rgba(0, 255, 255, 0.2)',
      margin: '0 auto',
      width: '100%',
      maxWidth: '1200px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      overflow: 'visible',
      position: 'relative',
      zIndex: 2
    },
    metricCard: {
      padding: '1.25rem',
      borderRadius: '0.75rem',
      background: 'linear-gradient(45deg, rgba(11, 61, 145, 0.15), rgba(0, 255, 255, 0.2))',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)',
      border: '1px solid rgba(0, 255, 255, 0.2)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      width: '100%',
      overflow: 'hidden',
      height: '100%'
    },
    metricIcon: {
      fontSize: '1.75rem',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 255, 255, 0.1)',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
      margin: '0 auto 0.5rem'
    },
    metricTitle: {
      fontWeight: '600',
      fontSize: '1rem',
      color: 'white',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      marginBottom: '0.25rem',
      textAlign: 'center',
      lineHeight: 1.2
    },
    metricDescription: {
      fontSize: '0.8rem',
      opacity: 0.9,
      lineHeight: 1.3,
      textAlign: 'center',
      margin: '0 auto 0.25rem',
      width: '100%',
      maxWidth: '100%',
      height: '2.6rem', // Fixed height for 2 lines of text
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis'
    },
    methodCard: (method, isHighlighted) => ({
      padding: '1rem',
      borderRadius: '0.75rem',
      background: isHighlighted ? `linear-gradient(135deg, ${method.color}, ${method.darkColor})` : 'rgba(255, 255, 255, 0.1)',
      border: '1px solid',
      borderColor: isHighlighted ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      boxShadow: isHighlighted ? '0 5px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 255, 255, 0.2)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }),
    methodName: {
      fontWeight: '600',
      fontSize: '0.9rem',
      marginBottom: '0.25rem',
      lineHeight: 1.2
    },
    methodDescription: {
      fontSize: '0.75rem',
      opacity: 0.9,
      lineHeight: 1.3,
      height: '2.8rem', // Fixed height for description
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis'
    },
    valueDisplay: (status) => {
      const baseStyle = {
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        borderRadius: '50px',
        fontWeight: '500',
        fontSize: '0.8rem',
        margin: '0 auto',
        width: 'auto',
        maxWidth: '90%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: '2.5rem',
        textAlign: 'center'
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
    methodValueCard: (method, isHighlighted) => ({
      padding: '0.5rem',
      borderRadius: '0.5rem',
      background: isHighlighted ? 
        `linear-gradient(45deg, ${method.lightColor}, rgba(0, 255, 255, 0.15))` : 
        'rgba(255, 255, 255, 0.05)',
      border: '1px solid',
      borderColor: isHighlighted ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      boxShadow: isHighlighted ? '0 2px 8px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 255, 255, 0.15)' : 'none',
      transition: 'all 0.3s ease',
      width: '100%',
      minWidth: 0,
      height: '100%'
    }),
    methodLabel: {
      fontSize: '0.7rem',
      fontWeight: '600',
      marginBottom: '0.1rem',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    tabButton: (isActive) => ({
      padding: '0.6rem 1rem',
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
      boxShadow: isActive ? '0 0 15px rgba(0, 255, 255, 0.3)' : 'none',
      fontSize: '0.85rem'
    }),
    comingSoon: {
      fontSize: '0.65rem',
      background: 'rgba(234, 179, 8, 0.4)',
      color: 'white',
      padding: '0.1rem 0.4rem',
      borderRadius: '50px',
      marginLeft: '0.5rem',
      display: 'inline-block'
    },
    tooltip: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer'
    },
    tooltipText: {
      visibility: 'hidden',
      width: '120px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      textAlign: 'center',
      borderRadius: '6px',
      padding: '5px',
      position: 'absolute',
      zIndex: 1,
      bottom: '125%',
      left: '50%',
      marginLeft: '-60px',
      opacity: 0,
      transition: 'opacity 0.3s',
      fontSize: '0.75rem',
      pointerEvents: 'none'
    }
  };

  return (
    <section className="comparison-section" id="comparison" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Compare Preservation Methods</h2>
          <p className="section-subtitle">
            See how Spanex technology stacks up against traditional preservation methods
          </p>
        </div>
        
        <div style={styles.comparisonContainer}>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>Select Product:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-start' }}>
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => !product.comingSoon && setSelectedProduct(product.id)}
                      style={product.comingSoon 
                        ? {...styles.tabButton(false), opacity: 0.5, cursor: 'not-allowed'} 
                        : styles.tabButton(selectedProduct === product.id)
                      }
                      disabled={product.comingSoon}
                    >
                      <span style={{ fontSize: '1rem' }}>{product.icon}</span>
                      {product.name}
                      {product.comingSoon && (
                        <span style={styles.comingSoon}>Coming Soon</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: windowWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '0.75rem',
              width: '100%',
              overflow: 'hidden',
              marginBottom: '2rem'
            }}>
              {methods.map(method => (
                <div
                  key={method.id}
                  style={styles.methodCard(method, highlightedMethod === method.id)}
                  onClick={() => setHighlightedMethod(method.id)}
                  onMouseEnter={() => setHighlightedMethod(method.id)}
                  onMouseLeave={() => setHighlightedMethod(null)}
                  title={method.name}
                >
                  <div style={styles.methodName}>{method.name}</div>
                  <div style={styles.methodDescription}>{method.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.25rem', textAlign: 'center', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Comparison Results for {products.find(p => p.id === selectedProduct).name}
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: windowWidth < 640 ? '1fr' :
                                   windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '1rem',
              width: '100%',
              overflow: 'hidden'
            }}>
              {metrics.map(metric => {
                const otherValues = methods
                  .filter(m => m.id !== highlightedMethod)
                  .map(m => comparisonData[selectedProduct][m.id][metric.id]);
                
                return (
                  <div key={metric.id} style={styles.metricCard} title={metric.description}>
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                      <div style={styles.metricIcon}>
                        <span style={{ fontSize: '1.5rem' }}>{metric.icon}</span>
                      </div>
                      <div style={styles.metricTitle}>{metric.name}</div>
                      <div style={styles.metricDescription}>{metric.description}</div>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: windowWidth < 640 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      paddingTop: '0.5rem',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
                      {methods.map(method => {
                        const value = comparisonData[selectedProduct][method.id][metric.id];
                        const comparisonClass = getComparisonClass(
                          value, 
                          methods.filter(m => m.id !== method.id).map(m => comparisonData[selectedProduct][m.id][metric.id]), 
                          metric
                        );
                        
                        return (
                          <div 
                            key={`${metric.id}-${method.id}`} 
                            style={styles.methodValueCard(method, highlightedMethod === method.id)}
                            title={`${method.name}: ${formatValue(value, metric)}`}
                          >
                            <div style={styles.methodLabel}>{method.shortName}</div>
                            <div style={styles.valueDisplay(comparisonClass)}>
                              {formatValue(value, metric)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p style={{ fontSize: '0.8rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', marginTop: '1.5rem' }}>
              * Comparison data based on laboratory testing and industry standards. Actual results may vary depending on specific conditions.
            </p>
          </div>
        </div>
        <div className="comparison-section__footnote">
          <p className="comparison-section__footnote-text">
          * Comparison data based on laboratory testing and industry standards. Actual results may vary depending on specific conditions.
          </p>
          <div className="comparison-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`comparison-section__indicator-bar ${index < 5 ? 'comparison-section__indicator-bar--active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;