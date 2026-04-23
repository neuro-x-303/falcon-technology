import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '0.5rem 0',
      height: 'auto',
      minHeight: '60px'
    }}>
      <Link to="/" className="nav-brand" style={{ 
        textDecoration: 'none', 
        color: 'inherit', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '1.2rem', 
          letterSpacing: '3px', 
          fontFamily: 'Orbitron, sans-serif' 
        }}>FALCON TECHNOLOGY</h1>
        <p style={{ 
          margin: 0, 
          fontSize: '0.7rem', 
          letterSpacing: '1px', 
          opacity: 0.8,
          color: '#00f3ff',
          textTransform: 'uppercase'
        }}>App Development Hub</p>
      </Link>
    </nav>
  );
};

export default Navbar;
