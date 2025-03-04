import React from 'react';
import labImage from '../../images/lab.jpg'; // Import the lab image

const AboutSection = () => {
  return (
    <section id="about" className="py-20" style={{
      background: `var(--soft-cream) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" opacity="0.1"><path d="M20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 Z" fill="none" stroke="%23228B22" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="%23228B22"/><circle cx="30" cy="30" r="3" fill="%23228B22"/><circle cx="70" cy="30" r="3" fill="%23228B22"/><circle cx="30" cy="70" r="3" fill="%23228B22"/><circle cx="70" cy="70" r="3" fill="%23228B22"/></svg>')`
    }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">About Spanex Sciences</h2>
            <p className="text-lg text-gray-600 mb-6">
              Spanex Sciences is a pioneering startup with 100+ innovative formulations, both organic and non-organic, with registered know-how across multiple industries.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our breakthrough preservation technologies extend the shelf life of fruits, vegetables, and flowers, while maintaining their natural taste, appearance, and nutritional value.
            </p>
            <p className="text-lg text-gray-600">
              Beyond food preservation, we're developing cutting-edge solutions for human and animal health, including superfoods that increase lifespan based on specific health conditions, and waterless body wash products.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Core Offerings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--light-mint)' }}>
                    <i className="fas fa-apple-alt" style={{ color: 'var(--primary)' }}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Produce Preservation</h4>
                    <p className="text-sm text-gray-600">Extending shelf life of fruits, vegetables and flowers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--light-mint)' }}>
                    <i className="fas fa-flask" style={{ color: 'var(--accent)' }}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">GRAS Formulations</h4>
                    <p className="text-sm text-gray-600">FDA-compliant, safe ingredients</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--light-mint)' }}>
                    <i className="fas fa-seedling" style={{ color: 'var(--primary)' }}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Organic Solutions</h4>
                    <p className="text-sm text-gray-600">Organic-certified preservation options</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--light-mint)' }}>
                    <i className="fas fa-globe-americas" style={{ color: 'var(--amber)' }}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Country-Specific</h4>
                    <p className="text-sm text-gray-600">Tailored to specific growing regions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <img 
              src={labImage} 
              alt="Lab research" 
              className="rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;