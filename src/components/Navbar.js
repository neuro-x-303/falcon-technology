import React, { useState, useEffect } from 'react';
import { Layout, Bell, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <motion.div 
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className="nav-logo-container"
        >
          <Layout size={32} className="nav-icon" />
        </motion.div>
        <span className="nav-title">FALCON <span>MANAGEMENT</span></span>
      </div>

      {/* Desktop Menu */}
      <div className="nav-links desktop-only">
        <a href="/management-apps" className="active">Dashboard</a>
        <a href="#projects">Projects</a>
        <a href="#team">Team</a>
        <a href="#settings">Settings</a>
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
            <a href="/management-apps">Dashboard</a>
            <a href="#projects">Projects</a>
            <a href="#team">Team</a>
            <a href="#settings">Settings</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
