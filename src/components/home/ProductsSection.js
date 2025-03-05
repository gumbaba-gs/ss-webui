import React from 'react';
import './ProductsSection.css';

const ProductsSection = () => {
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

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Revolutionary shelf-life extension formulations for various fruits and vegetables.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`product-card ${!product.available ? 'coming-soon' : ''}`}
            >
              {!product.available && (
                <div className="coming-soon-badge">Coming Soon</div>
              )}
              
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
              </div>
              
              <div className="product-content">
                <div className="product-header">
                  <h3 className="product-title">{product.name}</h3>
                  <span className={`product-badge ${product.badgeType}`}>
                    {product.badge}
                  </span>
                </div>
                
                <p className="product-description">{product.description}</p>
                
                <div className="product-specs">
                  {product.shelfLife && (
                    <div className="product-spec">
                      <span className="spec-label">Shelf Life Extension:</span>
                      <span className="spec-value">{product.shelfLife}</span>
                    </div>
                  )}
                  
                  {product.application && (
                    <div className="product-spec">
                      <span className="spec-label">Application:</span>
                      <span className="spec-value">{product.application}</span>
                    </div>
                  )}
                  
                  {product.dilution && (
                    <div className="product-spec">
                      <span className="spec-label">Dilution Ratio:</span>
                      <span className="spec-value">{product.dilution}</span>
                    </div>
                  )}
                  
                  {product.availableFrom && (
                    <div className="product-spec">
                      <span className="spec-label">Available From:</span>
                      <span className="spec-value">{product.availableFrom}</span>
                    </div>
                  )}
                </div>
                
                <a 
                  href={product.available ? `#${product.id}` : undefined} 
                  className={`product-cta ${!product.available ? 'disabled' : ''}`}
                  aria-disabled={!product.available}
                >
                  {product.available ? 'Learn More' : 'Coming Soon'}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="products-cta-container">
          <a href="#contact" className="products-cta">
            Request Product Information
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;