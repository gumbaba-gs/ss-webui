import React, { useState } from 'react';
import labImage from '../../images/lab.jpg'; // Import the lab image

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState(null);
  
  const toggleFeature = (id) => {
    if (expandedFeature === id) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(id);
    }
  };
  
  // Core offerings data
  const coreOfferings = [
    { 
      id: 'preservation', 
      title: 'Produce Preservation', 
      icon: '🍎',
      description: 'Extending shelf life of fruits, vegetables and flowers'
    },
    { 
      id: 'global', 
      title: 'Globally Approved Formulations', 
      icon: '🌐',
      description: 'FDA-compliant, safe ingredients'
    },
    { 
      id: 'organic', 
      title: 'Organic Solutions', 
      icon: '🌱',
      description: 'Organic-certified preservation options'
    },
    { 
      id: 'tailored', 
      title: 'Tailored Solutions', 
      icon: '🧪',
      description: 'Custom formulations for specific regions & climates'
    },
    { 
      id: 'safety', 
      title: 'Food Safety & Freshness Wash', 
      icon: '🧼',
      description: 'Remove contaminants while preserving shelf life'
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20" style={{
      background: `var(--soft-cream) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" opacity="0.1"><path d="M20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 Z" fill="none" stroke="%23228B22" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="%23228B22"/><circle cx="30" cy="30" r="3" fill="%23228B22"/><circle cx="70" cy="30" r="3" fill="%23228B22"/><circle cx="30" cy="70" r="3" fill="%23228B22"/><circle cx="70" cy="70" r="3" fill="%23228B22"/></svg>')`,
      backgroundSize: '100px 100px'
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title outside the container */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-5 text-text leading-tight">
            About Spanex Sciences
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pioneering scientific solutions for food preservation and human health
          </p>
        </div>
        
        {/* Glowing container starts here */}
        <div className="max-w-4xl mx-auto p-6 rounded-xl" 
          style={{
            background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
            border: "1px solid rgba(0, 255, 255, 0.2)"
          }}>
          
          <p className="text-text mb-6 leading-relaxed">
            Spanex Sciences is a <span className="font-semibold text-primary">pioneering scientific company</span> with over <span className="font-semibold text-primary">100 innovative formulations</span>, spanning both <span className="font-semibold text-secondary">organic and non-organic solutions</span>. Our <span className="font-semibold text-accent">proprietary technologies</span> are transforming multiple industries by enhancing <span className="font-semibold text-primary">preservation, sustainability, and human health</span>.
          </p>
          
          <p className="text-text mb-6 leading-relaxed">
            Our <span className="font-semibold text-primary">breakthrough preservation methods</span> extend the <span className="font-semibold text-primary">shelf life</span> of fruits, vegetables, and flowers—while maintaining their <span className="font-semibold text-secondary">natural taste, appearance, and nutritional value</span>.
          </p>
          
          <p className="text-text mb-6 leading-relaxed">
            Beyond food preservation, we are at the forefront of <span className="font-semibold text-primary">human and animal health innovations</span>, including <span className="font-semibold text-secondary">lifespan-enhancing superfoods</span>, <span className="font-semibold text-success">eco-friendly waterless hygiene products</span>, and <span className="font-semibold text-accent">advanced produce and meat wash solutions</span> that ensure <span className="font-semibold">safety, freshness, and compliance with global food safety standards</span>.
          </p>
          
          <div className="flex space-x-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 transition-colors ${
                activeTab === 'overview' 
                  ? 'text-primary border-b-2 border-primary font-medium' 
                  : 'text-text hover:text-primary'
              }`}
            >
              Company Overview
            </button>
            <button
              onClick={() => setActiveTab('offerings')}
              className={`px-4 py-2 transition-colors ${
                activeTab === 'offerings' 
                  ? 'text-primary border-b-2 border-primary font-medium' 
                  : 'text-text hover:text-primary'
              }`}
            >
              Core Offerings
            </button>
          </div>
          
          <div className="content-container">
            {activeTab === 'overview' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2">
                    <img
                      src={labImage}
                      alt="Lab research"
                      className="rounded-lg shadow-xl w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4 text-primary">Our Scientific Approach</h3>
                    <p className="text-text mb-4">
                      At Spanex Sciences, we combine cutting-edge research with practical applications to create solutions that address real-world challenges in food preservation and human health.
                    </p>
                    <p className="text-text mb-4">
                      Our team of scientists and food technology experts work together to develop formulations that are not only effective but also safe, sustainable, and compliant with global regulations.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 bg-primary-10 rounded-lg">
                        <div className="text-xl font-bold text-primary">100+</div>
                        <p className="text-sm text-text">Formulations</p>
                      </div>
                      
                      <div className="text-center p-3 bg-secondary-10 rounded-lg">
                        <div className="text-xl font-bold text-secondary">3-5×</div>
                        <p className="text-sm text-text">Shelf Life Extension</p>
                      </div>
                      
                      <div className="text-center p-3 bg-success-10 rounded-lg">
                        <div className="text-xl font-bold text-success">75%</div>
                        <p className="text-sm text-text">Waste Reduction</p>
                      </div>
                      
                      <div className="text-center p-3 bg-accent-10 rounded-lg">
                        <div className="text-xl font-bold text-accent">20+</div>
                        <p className="text-sm text-text">Countries Served</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'offerings' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold mb-6 text-primary">Our Core Offerings</h3>
                
                <div className="space-y-4">
                  {coreOfferings.map(offering => (
                    <div 
                      key={offering.id}
                      className="bg-background rounded-lg shadow-md overflow-hidden transition-all duration-300"
                    >
                      <div 
                        className="p-4 flex items-center cursor-pointer"
                        onClick={() => toggleFeature(offering.id)}
                      >
                        <div className="bg-primary-10 p-3 rounded-full mr-4 text-2xl">
                          {offering.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">{offering.title}</h4>
                          <p className="text-sm text-text">{offering.description}</p>
                        </div>
                        <div className="ml-auto">
                          <svg 
                            className={`w-5 h-5 text-primary transition-transform ${expandedFeature === offering.id ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      
                      {expandedFeature === offering.id && (
                        <div className="px-4 pb-4 animate-fadeIn">
                          <div className="pl-12 border-l-2 border-primary-10 ml-4">
                            {offering.id === 'preservation' && (
                              <ul className="space-y-2 text-sm text-text">
                                <li>• Extends shelf life by 3-5x for various produce types</li>
                                <li>• Maintains original taste, texture, and nutritional profile</li>
                                <li>• Reduces waste throughout the supply chain</li>
                                <li>• Works with both organic and conventional produce</li>
                              </ul>
                            )}
                            
                            {offering.id === 'global' && (
                              <ul className="space-y-2 text-sm text-text">
                                <li>• GRAS (Generally Recognized As Safe) ingredients</li>
                                <li>• Complies with FDA, EU, and global regulatory standards</li>
                                <li>• Transparent ingredient disclosure</li>
                                <li>• Extensive safety testing and documentation</li>
                              </ul>
                            )}
                            
                            {offering.id === 'organic' && (
                              <ul className="space-y-2 text-sm text-text">
                                <li>• USDA and EU organic certified formulations</li>
                                <li>• Plant-based, food-derived ingredients</li>
                                <li>• No synthetic chemicals or preservatives</li>
                                <li>• Compatible with organic farming practices</li>
                              </ul>
                            )}
                            
                            {offering.id === 'tailored' && (
                              <ul className="space-y-2 text-sm text-text">
                                <li>• Region-specific formulations for local produce varieties</li>
                                <li>• Climate-adapted solutions for varying humidity and temperature</li>
                                <li>• Custom blends for specific post-harvest challenges</li>
                                <li>• Specialized solutions for supply chain optimization</li>
                              </ul>
                            )}
                            
                            {offering.id === 'safety' && (
                              <ul className="space-y-2 text-sm text-text">
                                <li>• Removes pesticides, pathogens, and contaminants</li>
                                <li>• Combined cleaning and preservation in one application</li>
                                <li>• Reduces cross-contamination risk</li>
                                <li>• Enhances food safety metrics while extending freshness</li>
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Counter bars similar to food waste counter */}
          <div className="counter-bars mt-6 text-center">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`counter-bar inline-block w-6 h-2 mx-1 rounded-full ${index < 5 ? 'bg-accent opacity-70' : 'bg-accent opacity-20'}`}
              ></div>
            ))}
          </div>
          
          <p className="mt-6 text-center text-gray-600">
            With Spanex technology, we can reduce food waste by up to 75%.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;