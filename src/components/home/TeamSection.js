import React, { useState, useRef, useEffect } from 'react';
import './TeamSection.css';

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef(null);
  
  // Setup intersection observer to animate in when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Array of team member data for easier maintenance
  const teamMembers = [
    {
      id: 'asmita',
      name: 'Dr. Asmita Prabhune',
      image: 'https://placehold.co/400x400/1a5e63/ffffff?text=Dr.+Asmita',
      role: 'Chief Scientist & Founder',
      bio: 'Leading chemist with extensive experience in food preservation technology and multiple patents to her name.',
      category: 'leadership',
      social: {
        linkedin: 'https://www.linkedin.com/in/asmita-prabhune-01580732/',
        email: '#contact'
      }
    },
    {
      id: 'gum',
      name: 'Gum Shahid',
      image: 'https://placehold.co/400x400/1a5e63/ffffff?text=Gum+Shahid',
      role: 'CTO & Co-Founder',
      bio: 'IT expert with 20 years of experience in technology implementation and system design for scientific applications.',
      category: 'leadership',
      social: {
        linkedin: 'https://www.linkedin.com/in/gumshahid/',
        email: '#contact'
      }
    },
    {
      id: 'khaja',
      name: 'Khaja Nayub Rasul Sheik',
      image: 'https://placehold.co/400x400/1a5e63/ffffff?text=Khaja+Nayub',
      role: 'Business Development & Co-Founder',
      bio: 'Expert in international trade with 15+ years of experience in import/export operations and global market expansion.',
      category: 'leadership',
      social: {
        linkedin: 'https://www.linkedin.com/in/khaja-nayub-rasul-sheik-20b6a6145/',
        email: '#contact'
      }
    },
    {
      id: 'khaderi',
      name: 'Khaderi Sharief Karimullasha',
      image: 'https://placehold.co/400x400/1a5e63/ffffff?text=Khaderi+Sharief',
      role: 'COO, American Region',
      bio: 'Operations expert specializing in American markets with extensive experience in scaling science-based startups.',
      category: 'operations',
      social: {
        linkedin: 'https://www.linkedin.com/in/khaderi-sharief-karimullasha-35110b19/',
        email: '#contact'
      }
    }
  ];

  // Filter team members based on active tab
  const filteredMembers = activeTab === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === activeTab);

  // Tab options
  const tabs = [
    { id: 'all', label: 'All Team' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'operations', label: 'Operations' }
  ];

  return (
    <section className="team-section" id="team" ref={sectionRef}>
      <div className="team-section-header">
        <h2 className="team-section-title">Our Expert Team</h2>
        <p className="team-section-subtitle">
          Meet the visionaries and experts behind Spanex Sciences' groundbreaking formulations.
        </p>
      </div>

      <div className={`team-container ${isVisible ? 'fade-in' : ''}`}>
        <div className="team-card-container">
          {/* Tab Buttons */}
          <div className="team-tab-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`team-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Team Members Grid */}
          <div className="team-grid">
            {filteredMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={`team-card ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="member-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="member-image"
                    loading="lazy" 
                  />
                </div>
                
                <div className="member-content">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  
                  <div className="member-social">
                    {member.social.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${member.name}'s LinkedIn profile`}
                        className="social-link linkedin"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    )}
                    
                    {member.social.email && (
                      <a 
                        href={member.social.email} 
                        aria-label={`Email ${member.name}`}
                        className="social-link email"
                      >
                        <i className="fas fa-envelope"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="team-cta-card">
          <p className="team-cta-text">
            Interested in joining our team or learning more about our work?
          </p>
          
          <a href="#contact" className="team-cta-button">
            Contact Our Team
          </a>
          
          <div className="team-indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`team-indicator-bar ${index < 5 ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;