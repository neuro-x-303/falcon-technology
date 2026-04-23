import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Bell, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Core', path: '/' },
    { name: 'Architectures', path: '/management-apps' },
    { name: 'API Layers', path: '#api' },
    { name: 'Edge Nodes', path: '#edge' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.div 
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className="nav-logo-container"
        >
          <Cpu size={32} className="nav-icon" />
        </motion.div>
        <span className="nav-title">FALCON TECHNOLOGY</span>
      </Link>

      {/* Desktop Menu */}
      <div className="nav-links desktop-only">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Core</Link>
        <Link to="/systemterminal" className={location.pathname === '/systemterminal' ? 'active' : ''}>Architectures</Link>
        <a href="/management-apps/index.html">Uplink</a>
      </div>

      <div className="nav-actions desktop-only">
        <div className="search-container">
          <Search size={18} />
          <input type="text" placeholder="Search projects..." />
        </div>
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <div className="avatar">JD</div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="mobile-toggler"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

