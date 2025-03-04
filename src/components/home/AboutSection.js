import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
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
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <i className="fas fa-apple-alt text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Produce Preservation</h4>
                    <p className="text-sm text-gray-600">Extending shelf life of fruits, vegetables and flowers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <i className="fas fa-flask text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">GRAS Formulations</h4>
                    <p className="text-sm text-gray-600">FDA-compliant, safe ingredients</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <i className="fas fa-seedling text-purple-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Organic Solutions</h4>
                    <p className="text-sm text-gray-600">Organic-certified preservation options</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-4">
                    <i className="fas fa-globe-americas text-yellow-600"></i>
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
              src="https://placehold.co/600x500/1a5e63/ffffff?text=Lab+Research" 
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