import React, { useState, useRef, useEffect } from 'react';
import './ProductsSection.css';

const ProductsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sectionRef = useRef(null);
  
  // Track window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Setup intersection observer to animate in when visible
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

  // Array of product data for easier maintenance
  const products = [
    {
      id: 'berry-fresh',
      name: 'Berry Fresh',
      image: 'https://placehold.co/400x300/1a5e63/ffffff?text=Berry+Fresh',
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Our specialized formulation for all varieties of berries, extending shelf life by 3-4x while maintaining color, texture, and flavor.',
      shelfLife: '3-4X',
      application: 'Spray or Dip',
      dilution: '1:1000',
      available: true
    },
    {
      id: 'apple-shield',
      name: 'Apple Shield',
      image: 'https://placehold.co/400x300/1a5e63/ffffff?text=Apple+Shield',
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Specially formulated for apples, prevents browning and maintains crispness for weeks longer than untreated fruit.',
      shelfLife: '2-3X',
      application: 'Spray',
      dilution: '1:1000',
      available: true
    },
    {
      id: 'leafy-green',
      name: 'Leafy Green Preserver',
      image: 'https://placehold.co/400x300/1a5e63/ffffff?text=Leafy+Green',
      badge: 'Standard',
      badgeType: 'standard',
      description: 'Advanced formulation for lettuce, spinach, and other leafy greens to prevent wilting and yellowing.',
      shelfLife: '2-3X',
      application: 'Spray or Mist',
      availableFrom: 'Q2 2025',
      available: false
    }
  ];

  // Main container style
  const outerContainerStyle = {
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    padding: windowWidth < 768 ? '1rem' : '1.5rem',
    animation: isVisible ? 'fadeIn 1s ease-out' : 'none',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  };

  // Card style
  const cardStyle = {
    background: 'linear-gradient(45deg, rgba(11, 61, 145, 0.8), rgba(0, 128, 128, 0.9))',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 255, 255, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: windowWidth < 768 ? '1rem' : '1.5rem',
    marginBottom: windowWidth < 768 ? '1rem' : '1.5rem'
  };

  // Header style
  const headerStyle = {
    fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem',
    fontWeight: '600',
    marginBottom: windowWidth < 768 ? '0.75rem' : '1rem',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  // Product card style
  const productCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: windowWidth < 768 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: '1rem',
    margin: '1rem 0'
  };

  return (
    <section className="products-section" id="products">
      <div ref={sectionRef} style={outerContainerStyle}>
        <div style={cardStyle}>
          <h2 style={headerStyle}>Our Products</h2>
          <p style={{
            color: 'white',
            marginBottom: '1rem',
            textAlign: 'center',
            opacity: 0.9
          }}>
            Revolutionary shelf-life extension formulations for various fruits and vegetables.
          </p>

          <div style={productGridStyle}>
            {products.map((product) => (
              <div 
                key={product.id} 
                style={{
                  ...productCardStyle,
                  opacity: product.available ? 1 : 0.8,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `transform 0.5s ease ${products.indexOf(product) * 0.1}s, opacity 0.5s ease ${products.indexOf(product) * 0.1}s, box-shadow 0.3s ease`
                }}
                onMouseOver={(e) => {
                  if (product.available) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (product.available) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {!product.available && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(234, 179, 8, 0.9)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    zIndex: 2
                  }}>
                    Coming Soon
                  </div>
                )}
                
                <div style={{
                  height: '180px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    loading="lazy" 
                  />
                </div>
                
                <div style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'white',
                      margin: 0
                    }}>
                      {product.name}
                    </h3>
                    
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      backgroundColor: product.badgeType === 'organic' ? 
                        'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                      color: product.badgeType === 'organic' ? 
                        '#4ade80' : '#60a5fa'
                    }}>
                      {product.badge}
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'white',
                    opacity: 0.9,
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                    flexGrow: 1
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '0.75rem',
                    marginTop: 'auto',
                    marginBottom: '1rem'
                  }}>
                    {product.shelfLife && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          Shelf Life Extension:
                        </span>
                        <span style={{
                          fontWeight: '600',
                          color: 'white'
                        }}>
                          {product.shelfLife}
                        </span>
                      </div>
                    )}
                    
                    {product.application && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          Application:
                        </span>
                        <span style={{
                          fontWeight: '600',
                          color: 'white'
                        }}>
                          {product.application}
                        </span>
                      </div>
                    )}
                    
                    {product.dilution && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          Dilution Ratio:
                        </span>
                        <span style={{
                          fontWeight: '600',
                          color: 'white'
                        }}>
                          {product.dilution}
                        </span>
                      </div>
                    )}
                    
                    {product.availableFrom && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          Available From:
                        </span>
                        <span style={{
                          fontWeight: '600',
                          color: 'white'
                        }}>
                          {product.availableFrom}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <a 
                    href={product.available ? `#${product.id}` : undefined} 
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: product.available ? 
                        'rgba(11, 61, 145, 0.8)' : 'rgba(107, 114, 128, 0.5)',
                      color: 'white',
                      fontWeight: '600',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.3s, transform 0.3s',
                      cursor: product.available ? 'pointer' : 'not-allowed'
                    }}
                    onMouseOver={(e) => {
                      if (product.available) {
                        e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.9)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (product.available) {
                        e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.8)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                    aria-disabled={!product.available}
                  >
                    {product.available ? 'Learn More' : 'Coming Soon'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          ...cardStyle, 
          textAlign: 'center',
          padding: '1.5rem'
        }}>
          <a 
            href="#contact" 
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(11, 61, 145, 0.8)',
              color: 'white',
              fontWeight: '600',
              padding: '0.875rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.9)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Request Product Information
          </a>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.25rem',
            marginTop: '1.5rem'
          }}>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                style={{
                  height: windowWidth < 768 ? '6px' : '8px',
                  width: windowWidth < 768 ? '24px' : '30px',
                  background: index < 5 ? 
                    'linear-gradient(to right, var(--secondary-color), var(--accent-color))' : 
                    'rgba(0, 255, 255, 0.1)',
                  borderRadius: '4px',
                  border: index < 5 ? 
                    '1px solid rgba(0, 255, 255, 0.5)' : 
                    '1px solid rgba(0, 255, 255, 0.2)',
                  boxShadow: index < 5 ? 
                    '0 0 10px rgba(0, 255, 255, 0.4)' : 
                    '0 0 5px rgba(0, 255, 255, 0.1)'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;