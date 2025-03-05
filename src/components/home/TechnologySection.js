import React from 'react';
import MechanismDiagram from './MechanismDiagram';

const TechnologySection = () => {
  return (
    <section id="technology" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Our Multi-Mechanism Technology
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Spanex preservatives work through four synergistic mechanisms that provide comprehensive 
            protection against all major causes of produce deterioration.
          </p>
        </div>

        {/* Interactive 3D Mechanism Diagram */}
        <div className="mb-16">
          <MechanismDiagram />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="w-full max-w-4xl mx-auto p-6 rounded-xl"
            style={{
              background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
              border: "1px solid rgba(0, 255, 255, 0.2)"
            }}>
            <div className="mechanism-icon text-blue-500 mb-4">
              <i className="fas fa-wind"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Respiration Control</h3>
            <p className="text-gray-600 mb-4">
              Regulates gas exchange and slows down ethylene-induced ripening, extending shelf life by 
              delaying the natural aging process.
            </p>
            
          </div>

          <div className="w-full max-w-4xl mx-auto p-6 rounded-xl"
            style={{
              background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
              border: "1px solid rgba(0, 255, 255, 0.2)"
            }}>
            <div className="mechanism-icon text-teal-500 mb-4">
              <i className="fas fa-tint"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Moisture Optimization</h3>
            <p className="text-gray-600 mb-4">
              Creates optimal moisture equilibrium to prevent both dehydration and excess moisture that 
              promotes mold growth.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto p-6 rounded-xl"
            style={{
              background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
              border: "1px solid rgba(0, 255, 255, 0.2)"
            }}>
            <div className="mechanism-icon text-green-500 mb-4">
              <i className="fas fa-shield-virus"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Microbial Inhibition</h3>
            <p className="text-gray-600 mb-4">
              Creates an inhospitable environment for bacteria and fungi, preventing spoilage without 
              synthetic preservatives.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto p-6 rounded-xl"
            style={{
              background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
              border: "1px solid rgba(0, 255, 255, 0.2)"
            }}>
            <div className="mechanism-icon text-purple-500 mb-4">
              <i className="fas fa-atom"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Oxidation Prevention</h3>
            <p className="text-gray-600 mb-4">
              Prevents enzymatic browning and maintains color stability through powerful natural antioxidants.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;