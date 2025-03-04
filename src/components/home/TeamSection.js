import React from 'react';

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Expert Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the visionaries and experts behind Spanex Sciences' groundbreaking formulations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="team-member bg-white rounded-lg overflow-hidden shadow-md">
            <div 
              className="h-64 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x400/1a5e63/ffffff?text=Dr.+Asmita')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Dr. Asmita Prabhune</h3>
              <p className="text-blue-600 font-medium mb-3">Chief Scientist & Founder</p>
              <p className="text-gray-600 mb-4">
                Leading chemist with extensive experience in food preservation technology and multiple patents to her name.
              </p>
              <div className="social-icons flex justify-center">
                <a href="https://www.linkedin.com/in/asmita-prabhune-01580732/" target="_blank" rel="noopener noreferrer" className="hover:bg-blue-700">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="hover:bg-blue-700">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="team-member bg-white rounded-lg overflow-hidden shadow-md">
            <div 
              className="h-64 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x400/1a5e63/ffffff?text=Gum+Shahid')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Gum Shahid</h3>
              <p className="text-blue-600 font-medium mb-3">CTO & Co-Founder</p>
              <p className="text-gray-600 mb-4">
                IT expert with 20 years of experience in technology implementation and system design for scientific applications.
              </p>
              <div className="social-icons flex justify-center">
                <a href="https://www.linkedin.com/in/gumshahid/" target="_blank" rel="noopener noreferrer" className="hover:bg-blue-700">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="hover:bg-blue-700">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="team-member bg-white rounded-lg overflow-hidden shadow-md">
            <div 
              className="h-64 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x400/1a5e63/ffffff?text=Khaja+Nayub')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Khaja Nayub Rasul Sheik</h3>
              <p className="text-blue-600 font-medium mb-3">Business Development & Co-Founder</p>
              <p className="text-gray-600 mb-4">
                Expert in international trade with 15+ years of experience in import/export operations and global market expansion.
              </p>
              <div className="social-icons flex justify-center">
                <a href="https://www.linkedin.com/in/khaja-nayub-rasul-sheik-20b6a6145/" target="_blank" rel="noopener noreferrer" className="hover:bg-blue-700">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="hover:bg-blue-700">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="team-member bg-white rounded-lg overflow-hidden shadow-md">
            <div 
              className="h-64 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://placehold.co/400x400/1a5e63/ffffff?text=Khaderi+Sharief')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Khaderi Sharief Karimullasha</h3>
              <p className="text-blue-600 font-medium mb-3">COO, American Region</p>
              <p className="text-gray-600 mb-4">
                Operations expert specializing in American markets with extensive experience in scaling science-based startups.
              </p>
              <div className="social-icons flex justify-center">
                <a href="https://www.linkedin.com/in/khaderi-sharief-karimullasha-35110b19/" target="_blank" rel="noopener noreferrer" className="hover:bg-blue-700">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="hover:bg-blue-700">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;