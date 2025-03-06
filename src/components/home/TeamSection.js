import React, { useState, useRef, useEffect } from 'react';

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sectionRef = useRef(null);
  
  // Track window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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

  // Main container style
  const outerContainerStyle = {
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    padding: windowWidth < 768 ? '1rem' : '1.5rem',
    animation: isVisible ? 'fadeIn 1s ease-out' : 'none',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  };

  // Card style
  const cardStyle = {
    background: 'linear-gradient(45deg, rgba(11, 61, 145, 0.8), rgba(0, 128, 128, 0.9))',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 255, 255, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: windowWidth < 768 ? '1rem' : '1.5rem',
    marginBottom: windowWidth < 768 ? '1rem' : '1.5rem'
  };

  // Header style
  const headerStyle = {
    fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem',
    fontWeight: '600',
    marginBottom: windowWidth < 768 ? '0.75rem' : '1rem',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  // Team member card style
  const memberCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const teamGridStyle = {
    display: 'grid',
    gridTemplateColumns: windowWidth < 768 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: '1rem',
    margin: '1rem 0'
  };

  return (
    <section className="team-section" id="team">
      <div ref={sectionRef} style={outerContainerStyle}>
        <div style={cardStyle}>
          <h2 style={headerStyle}>Our Expert Team</h2>
          <p style={{
            color: 'white',
            marginBottom: '1rem',
            textAlign: 'center',
            opacity: 0.9
          }}>
            Meet the visionaries and experts behind Spanex Sciences' groundbreaking formulations.
          </p>

          <div style={teamGridStyle}>
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                style={{
                  ...memberCardStyle,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s, box-shadow 0.3s ease`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  aspectRatio: '1',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    loading="lazy" 
                  />
                </div>
                
                <div style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'white',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {member.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgb(152, 245, 255)',
                    fontWeight: '500',
                    marginBottom: '0.75rem'
                  }}>
                    {member.role}
                  </p>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'white',
                    opacity: 0.9,
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                    flexGrow: 1
                  }}>
                    {member.bio}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: 'auto'
                  }}>
                    {member.social.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${member.name}'s LinkedIn profile`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(11, 61, 145, 0.8)',
                          color: 'white',
                          transition: 'background-color 0.3s, transform 0.3s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.9)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.8)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    )}
                    
                    {member.social.email && (
                      <a 
                        href={member.social.email} 
                        aria-label={`Email ${member.name}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 128, 128, 0.8)',
                          color: 'white',
                          transition: 'background-color 0.3s, transform 0.3s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 128, 128, 0.9)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 128, 128, 0.8)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
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
        <div style={{
          ...cardStyle, 
          textAlign: 'center',
          padding: '1.5rem'
        }}>
          <p style={{
            color: 'white',
            marginBottom: '1.5rem',
            textAlign: 'center',
            opacity: 0.9,
            fontSize: '1.125rem'
          }}>
            Interested in joining our team or learning more about our work?
          </p>
          
          <a 
            href="#contact" 
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(11, 61, 145, 0.8)',
              color: 'white',
              fontWeight: '600',
              padding: '0.875rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.9)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11, 61, 145, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Contact Our Team
          </a>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.25rem',
            marginTop: '1.5rem'
          }}>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                style={{
                  height: windowWidth < 768 ? '6px' : '8px',
                  width: windowWidth < 768 ? '24px' : '30px',
                  background: index < 5 ? 
                    'linear-gradient(to right, var(--secondary-color), var(--accent-color))' : 
                    'rgba(0, 255, 255, 0.1)',
                  borderRadius: '4px',
                  border: index < 5 ? 
                    '1px solid rgba(0, 255, 255, 0.5)' : 
                    '1px solid rgba(0, 255, 255, 0.2)',
                  boxShadow: index < 5 ? 
                    '0 0 10px rgba(0, 255, 255, 0.4)' : 
                    '0 0 5px rgba(0, 255, 255, 0.1)'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;