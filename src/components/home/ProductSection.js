import React, { useState, useRef, useEffect } from 'react';
import './ProductSection.css';

const ProductsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Array of product data for easier maintenance
  const products = [
    {
      id: 'berry-fresh',
      name: 'Berry Fresh',
      image: 'https://placehold.co/400x300/1a5e63/ffffff?text=Berry+Fresh',
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Our specialized formulation for all varieties of berries, extending shelf life by 3-4x while maintaining color, texture, and flavor.',
      specs: [
        { label: 'Shelf Life Extension', value: '3-4X' },
        { label: 'Application', value: 'Spray or Dip' },
        { label: 'Dilution Ratio', value: '1:1000' }
      ],
      available: true
    },
    {
      id: 'apple-shield',
      name: 'Apple Shield',
      image: 'https://placehold.co/400x300/1a5e63/ffffff?text=Apple+Shield',
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Specially formulated for apples, prevents browning and maintains crispness for weeks longer than untreated fruit.',
      specs: [
        { label: 'Shelf Life Extension', value: '2-3X' },
        { label: 'Application', value: 'Spray' },
        { label: 'Dilution Ratio', value: '1:1000' }
      ],
      available: true
    },
    {
      id: 'leafy-green',
      name: 'Leafy Green Preserver',
      image: 'https://placehold.co/400x300/1a5e63/ffffff?text=Leafy+Green',
      badge: 'Standard',
      badgeType: 'standard',
      description: 'Advanced formulation for lettuce, spinach, and other leafy greens to prevent wilting and yellowing.',
      specs: [
        { label: 'Shelf Life Extension', value: '2-3X' },
        { label: 'Application', value: 'Spray or Mist' },
        { label: 'Available From', value: 'Q2 2025' }
      ],
      available: false
    }
  ];

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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="products-section__header">
          <h2 className="products-section__title">Our Products</h2>
          <p className="products-section__subtitle">
            Revolutionary shelf-life extension formulations for various fruits and vegetables.
          </p>
        </div>

        {/* Main Products Container */}
        <div 
          ref={sectionRef}
          className={`products-section__container ${isVisible ? 'visible' : ''}`}
        >
          <div className="products-section__grid">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className={`products-section__card ${!product.available ? 'products-section__card--coming-soon' : ''}`}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {!product.available && (
                  <div className="products-section__badge">Coming Soon</div>
                )}
                
                <div className="products-section__image-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="products-section__image"
                    loading="lazy"
                  />
                </div>
                
                <div className="products-section__content">
                  <div className="products-section__header-row">
                    <h3 className="products-section__name">{product.name}</h3>
                    
                    <span className={`products-section__type-badge products-section__type-badge--${product.badgeType}`}>
                      {product.badge}
                    </span>
                  </div>
                  
                  <p className="products-section__description">{product.description}</p>
                  
                  <div className="products-section__specs">
                    {product.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="products-section__spec-row">
                        <span className="products-section__spec-label">{spec.label}:</span>
                        <span className="products-section__spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={product.available ? `#${product.id}` : undefined} 
                    className="products-section__cta"
                    aria-disabled={!product.available}
                  >
                    {product.available ? 'Learn More' : 'Coming Soon'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Container */}
        <div className="products-section__cta-container">
          <p className="products-section__cta-message">
            Interested in our products or custom formulations?
          </p>
          
          <a href="#contact" className="products-section__main-cta">
            Request Product Information
          </a>
          
          <div className="products-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`products-section__indicator-bar ${
                  index < 5 ? 'products-section__indicator-bar--active' : ''
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;