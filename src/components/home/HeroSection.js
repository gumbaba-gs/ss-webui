import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
          Extending Nature's Freshness
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeIn"
          style={{ animationDelay: '0.3s' }}
        >
          Revolutionary GRAS-certified formulations that extend produce shelf life by up to 5x.
        </p>
        <div
          className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 animate-fadeIn"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            Our Products
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="wave-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;