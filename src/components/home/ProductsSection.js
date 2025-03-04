import React from 'react';

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionary shelf-life extension formulations for various fruits and vegetables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="product-card bg-white overflow-hidden shadow-lg">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x300/1a5e63/ffffff?text=Berry+Fresh')" }}
            ></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Berry Fresh</h3>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Organic</span>
              </div>
              <p className="text-gray-600 mb-4">
                Our specialized formulation for all varieties of berries, extending shelf life by 3-4x while maintaining color, texture, and flavor.
              </p>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shelf Life Extension:</span>
                  <span className="font-semibold">3-4X</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Application:</span>
                  <span className="font-semibold">Spray or Dip</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Dilution Ratio:</span>
                  <span className="font-semibold">1:1000</span>
                </div>
              </div>
              <a 
                href="#" 
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="product-card bg-white overflow-hidden shadow-lg">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x300/1a5e63/ffffff?text=Apple+Shield')" }}
            ></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Apple Shield</h3>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Organic</span>
              </div>
              <p className="text-gray-600 mb-4">
                Specially formulated for apples, prevents browning and maintains crispness for weeks longer than untreated fruit.
              </p>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shelf Life Extension:</span>
                  <span className="font-semibold">2-3X</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Application:</span>
                  <span className="font-semibold">Spray</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Dilution Ratio:</span>
                  <span className="font-semibold">1:1000</span>
                </div>
              </div>
              <a 
                href="#" 
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="product-card bg-white overflow-hidden shadow-lg relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold py-1 px-3 rounded-full">
              Coming Soon
            </div>
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x300/1a5e63/ffffff?text=Leafy+Green')" }}
            ></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Leafy Green Preserver</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Standard</span>
              </div>
              <p className="text-gray-600 mb-4">
                Advanced formulation for lettuce, spinach, and other leafy greens to prevent wilting and yellowing.
              </p>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shelf Life Extension:</span>
                  <span className="font-semibold">2-3X</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Application:</span>
                  <span className="font-semibold">Spray or Mist</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Available From:</span>
                  <span className="font-semibold">Q2 2025</span>
                </div>
              </div>
              <a 
                href="#" 
                className="block text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-lg mt-6 cursor-not-allowed"
              >
                Coming Soon
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Request Product Information
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;