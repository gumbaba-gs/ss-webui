import React from 'react';
import MechanismDiagram from './MechanismDiagram';
import './TechnologySection.css';

const TechnologySection = () => {
  // Mechanism data for the list below the diagram
  // const mechanisms = [
  //   {
  //     id: 'respiration',
  //     title: 'Respiration Control',
  //     icon: '🍃',
  //     description: 'Regulates gas exchange and slows down ethylene-induced ripening, extending shelf life by delaying the natural aging process.'
  //   },
  //   {
  //     id: 'moisture',
  //     title: 'Moisture Optimization',
  //     icon: '💧',
  //     description: 'Creates optimal moisture equilibrium to prevent both dehydration and excess moisture that promotes mold growth.'
  //   },
  //   {
  //     id: 'microbial',
  //     title: 'Microbial Inhibition',
  //     icon: '🦠',
  //     description: 'Creates an inhospitable environment for bacteria and fungi, preventing spoilage without synthetic preservatives.'
  //   },
  //   {
  //     id: 'oxidation',
  //     title: 'Oxidation Prevention',
  //     icon: '⚛️',
  //     description: 'Prevents enzymatic browning and maintains color stability through powerful natural antioxidants.'
  //   }
  // ];

  return (
    <section className="technology-section" id="technology">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Our Multi-Mechanism Technology
          </h2>
          <p className="section-subtitle">
            Spanex preservatives work through four synergistic mechanisms that provide comprehensive 
            protection against all major causes of produce deterioration.
          </p>
        </div>

        {/* Interactive 3D Mechanism Diagram */}
        <div className="mechanism-diagram-container">
          <MechanismDiagram />
        </div>

        {/* Mechanism cards */}
        {/* <div className="mechanism-cards">
          {mechanisms.map((mechanism) => (
            <div 
              key={mechanism.id} 
              className="mechanism-card"
            >
              <div className="mechanism-card-icon">
                <span>{mechanism.icon}</span>
              </div>
              <h3 className="mechanism-card-title">{mechanism.title}</h3>
              <p className="mechanism-card-description">
                {mechanism.description}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default TechnologySection;