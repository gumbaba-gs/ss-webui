import React from 'react';
import './TeamSection.css';

const TeamSection = () => {
  // Array of team member data for easier maintenance
  const teamMembers = [
    {
      id: 'asmita',
      name: 'Dr. Asmita Prabhune',
      image: 'https://placehold.co/400x400/1a5e63/ffffff?text=Dr.+Asmita',
      role: 'Chief Scientist & Founder',
      bio: 'Leading chemist with extensive experience in food preservation technology and multiple patents to her name.',
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
      social: {
        linkedin: 'https://www.linkedin.com/in/khaderi-sharief-karimullasha-35110b19/',
        email: '#contact'
      }
    }
  ];

  return (
    <section className="team-section" id="team">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Expert Team</h2>
          <p className="section-subtitle">
            Meet the visionaries and experts behind Spanex Sciences' groundbreaking formulations.
          </p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
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
                      className="social-link linkedin"
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  
                  {member.social.email && (
                    <a 
                      href={member.social.email} 
                      className="social-link email"
                      aria-label={`Email ${member.name}`}
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
    </section>
  );
};

export default TeamSection;