import React, { useState, useRef, useEffect } from 'react';
import './ProductSection.css';
import berryImage from './images/blueberries.jpeg';
import appleImage from './images/apple.jpg'
import leafyImage from './images/leafyveg.jpeg'
import flowerImage from './images/flowers.jpeg'
import orangesImage from './images/oranges.jpg'
import avocadoImage from './images/avocado.jpg'


const ProductSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);
  
  // Array of product data for easier maintenance
  const products = [
    {
      id: 'berry-fresh',
      name: 'Berry Fresh',
      image: berryImage,
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Our specialized formulation for all varieties of berries, extending shelf life by 3-4x while maintaining color, texture, and flavor.',
      specs: [
        { label: 'Shelf Life Extension', value: '3-4X' },
        { label: 'Application', value: 'Spray or Dip' },
        { label: 'Dilution Ratio', value: '1:1000' }
      ],
      detailedInfo: {
        overview: 'Berry Fresh is our flagship product, developed after 5 years of intensive research specifically for the delicate physiology of berries. It creates a protective microscopic barrier that dramatically slows respiration and prevents pathogen colonization.',
        benefits: [
          'Prevents mold and bacterial growth that commonly affects berries',
          'Maintains nutritional content including antioxidants and vitamins',
          'Preserves natural texture and juiciness while preventing moisture loss',
          'Completely odorless and tasteless - no effect on berry flavor profile',
          'USDA Organic certified for use in conventional and organic farming'
        ],
        applications: 'Apply as a fine mist spray directly on harvested berries or as a quick dip solution. Compatible with existing packing line equipment. One application typically provides complete protection throughout standard retail distribution.'
      },
      available: true
    },
    {
      id: 'apple-shield',
      name: 'Apple Shield',
      image: appleImage,
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Specially formulated for apples, prevents browning and maintains crispness for weeks longer than untreated fruit.',
      specs: [
        { label: 'Shelf Life Extension', value: '2-3X' },
        { label: 'Application', value: 'Spray' },
        { label: 'Dilution Ratio', value: '1:1000' }
      ],
      detailedInfo: {
        overview: 'Apple Shield was designed to address the unique challenges of apple preservation, specifically targeting enzyme-driven browning processes that occur after cutting and controlling respiration rates that lead to premature softening.',
        benefits: [
          'Prevents browning even after slicing for up to 8 hours',
          'Maintains apple crispness and textural qualities for extended periods',
          'Reduces susceptibility to common storage diseases like blue mold',
          'Creates protective barrier without affecting skin appearance or shine',
          'Helps apples retain moisture and prevents shriveling during storage'
        ],
        applications: 'Apply as a spray treatment post-washing and prior to packing. Can be integrated seamlessly into existing processing lines. Particularly effective for varieties prone to rapid quality deterioration such as McIntosh, Gala, and Honeycrisp.'
      },
      available: true
    },
    {
      id: 'citrus-guard',
      name: 'Citrus Guard',
      image: 'https://placehold.co/800x600/FF9D48/ffffff?text=Citrus+Guard',
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Specially formulated for oranges and citrus fruits, prevents moisture loss and maintains vibrant color and flavor profile.',
      specs: [
        { label: 'Shelf Life Extension', value: '2-3X' },
        { label: 'Application', value: 'Spray or Dip' },
        { label: 'Available From', value: 'Q1 2026' }
      ],
      available: false
    },
    {
      id: 'avocado-extend',
      name: 'Avocado Extend',
      image: 'https://placehold.co/800x600/568203/ffffff?text=Avocado+Extend',
      badge: 'Organic',
      badgeType: 'organic',
      description: 'Specially formulated for avocados, delays ripening process and prevents browning while preserving creamy texture.',
      specs: [
        { label: 'Shelf Life Extension', value: '3-4X' },
        { label: 'Application', value: 'Dip' },
        { label: 'Available From', value: 'Q4 2025' }
      ],
      available: false
    },
    {
      id: 'flora-fresh',
      name: 'Flora Fresh',
      image: flowerImage,
      badge: 'Standard',
      badgeType: 'standard',
      description: 'Innovative flower preservation formula that extends freshness and bloom life for cut flowers and ornamental plants.',
      specs: [
        { label: 'Shelf Life Extension', value: '4-5X' },
        { label: 'Application', value: 'Spray or Vase' },
        { label: 'Available From', value: 'Q3 2025' }
      ],
      available: false
    },
    {
      id: 'leafy-green',
      name: 'Leafy Green Preserver',
      image: leafyImage,
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

  // Function to open product details modal
  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Function to close product details modal
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

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
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (product.available && product.detailedInfo) {
                        openProductDetails(product);
                      }
                    }} 
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

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="products-section__modal">
            <div className="products-section__modal-content">
              <button 
                className="products-section__modal-close" 
                onClick={closeProductDetails}
                aria-label="Close details"
              >
                &times;
              </button>
              
              <div className="products-section__modal-header">
                <h3 className="products-section__modal-title">{selectedProduct.name}</h3>
                <span className={`products-section__type-badge products-section__type-badge--${selectedProduct.badgeType}`}>
                  {selectedProduct.badge}
                </span>
              </div>
              
              <div className="products-section__modal-body">
                <div className="products-section__modal-image-container">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="products-section__modal-image"
                  />
                </div>
                
                <div className="products-section__modal-details">
                  <h4 className="products-section__modal-section-title">Overview</h4>
                  <p className="products-section__modal-text">{selectedProduct.detailedInfo.overview}</p>
                  
                  <h4 className="products-section__modal-section-title">Key Benefits</h4>
                  <ul className="products-section__modal-list">
                    {selectedProduct.detailedInfo.benefits.map((benefit, index) => (
                      <li key={index} className="products-section__modal-list-item">{benefit}</li>
                    ))}
                  </ul>
                  
                  <h4 className="products-section__modal-section-title">Applications</h4>
                  <p className="products-section__modal-text">{selectedProduct.detailedInfo.applications}</p>
                  
                  <div className="products-section__modal-specs">
                    <h4 className="products-section__modal-section-title">Specifications</h4>
                    {selectedProduct.specs.map((spec, index) => (
                      <div key={index} className="products-section__modal-spec-row">
                        <span className="products-section__modal-spec-label">{spec.label}:</span>
                        <span className="products-section__modal-spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="products-section__modal-footer">
                <a href="#contact" className="products-section__modal-cta">
                  Request More Information
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;