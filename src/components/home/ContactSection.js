import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'berry',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted with data:', formData);
    alert('Thanks for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      interest: 'berry',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interested in our products or partnership opportunities? Contact us today.
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>

            <div className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <i className="fas fa-map-marker-alt text-primary"></i>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <p className="text-gray-600">123 Innovation Drive, Tech Park, CA 94105</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <i className="fas fa-envelope text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-gray-600">info@spanexsciences.com</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <i className="fas fa-phone text-primary"></i>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-10 mb-6 text-gray-800">Connect With Us</h3>
            <div className="flex space-x-4">
              <button className="bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button className="bg-secondary hover:bg-secondary/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="bg-error hover:bg-error/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-youtube"></i>
              </button>
              <button className="bg-accent hover:bg-accent/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fas fa-envelope"></i>
              </button>
            </div>
          </div>

          <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-text mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="company" className="block text-text mb-2">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="interest" className="block text-gray-700 mb-2">I'm interested in:</label>
                <select 
                  id="interest" 
                  className="border border-border rounded-md p-2 w-full"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="berry">Berry Preservation</option>
                  <option value="apple">Apple Preservation</option>
                  <option value="custom">Custom Formulation</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block text-text mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;