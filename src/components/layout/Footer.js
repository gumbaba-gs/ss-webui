import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Spanex<span className="text-blue-400">Sciences</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Revolutionizing preservation technology with GRAS-certified, organic-compliant formulations.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <i className="fab fa-youtube"></i>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <i className="fas fa-envelope"></i>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Berry Fresh</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Apple Shield</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Coming Soon</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Custom Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FDA Compliance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Application Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Spanex Sciences. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;