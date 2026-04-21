import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import ManagementDashboard from './components/ManagementDashboard';

import ThreeBackground from './components/ThreeBackground';

// Landing Page Component (Transformed into AI Tech Platform)
const LandingPage = () => {
  return (
    <div className="App">
      <ThreeBackground />
      
      {/* Hero Section */}
      <header className="hero">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-badge neon-border"
          >
            NEURAL PROTOCOL v4.02 // ACTIVE
          </motion.span>
          <h1 className="hero-title" style={{ fontSize: '5rem', lineHeight: '1', margin: '1rem 0' }}>
            ENGINEERING THE <br/>
            <span className="tech-gradient-text" style={{ textShadow: 'var(--neural-glow)' }}>FUTURE OF COGNITION</span>
          </h1>
          <p className="hero-description" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '2rem auto' }}>
            Falcon Technology develops high-fidelity neural architectures, autonomous app ecosystems, 
            and enterprise-grade API synthesis for the next era of synthetic intelligence.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/management-apps" 
              className="hero-cta"
              style={{ padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              INITIALIZE TERMINAL
            </motion.a>
            <motion.button 
              whileHover={{ backgroundColor: 'rgba(0, 243, 255, 0.1)' }}
              className="hero-cta" 
              style={{ background: 'transparent', border: '1px solid var(--primary-color)', color: '#fff', padding: '1rem 3rem' }}
            >
              UPLINK SPECS
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Capabilities Section */}
      <section className="services" style={{ padding: '10rem 4%' }}>
        <div className="section-header">
          <h2 className="tech-gradient-text" style={{ fontSize: '3rem' }}>CORE ARCHITECTURES</h2>
          <p style={{ letterSpacing: '2px', color: 'var(--text-secondary)' }}>DEEP-TECH SOLUTIONS FOR THE SYNTHETIC FRONTIER</p>
        </div>
        <div className="services-grid">
          {[
            { title: 'Neural Modeling', desc: 'Custom synthetic brains trained on proprietary datasets for hyper-accurate predictive analysis.', icon: '🧠', color: 'var(--primary-color)' },
            { title: 'App Synthesis', desc: 'Automated generation of high-fidelity management platforms with real-time neural integration.', icon: '⚡', color: 'var(--secondary-color)' },
            { title: 'API Orchestration', desc: 'Ultra-low latency data bridges connecting decentralized intelligence nodes globally.', icon: '🌐', color: 'var(--accent-color)' }
          ].map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15, boxShadow: `0 20px 40px ${s.color}22` }} 
              className="service-card glass-container neon-border" 
              style={{ padding: '3rem', textAlign: 'center' }}
            >
              <div className="card-icon" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Orbitron' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '8rem 4%', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="stats-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { label: 'Neural Throughput', val: '84.2 TB/s' },
            { label: 'Active Nodes', val: '4,209' },
            { label: 'Global Latency', val: '< 0.08ms' },
            { label: 'Model Accuracy', val: '99.992%' }
          ].map((st, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '2.5rem', fontFamily: 'Orbitron', color: 'var(--primary-color)' }}>{st.val}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Mesh Section - Call to Action */}
      <section style={{ padding: '10rem 4%', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'var(--secondary-color)', filter: 'blur(150px)', opacity: '0.1', pointerEvents: 'none' }}></div>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'Orbitron', marginBottom: '1.5rem' }}>READY TO <span className="tech-gradient-text">UPLINK?</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Join the mesh and orchestrate your neural destiny today.</p>
          <a href="/management-apps" className="hero-cta" style={{ borderRadius: '50px', padding: '1.2rem 4rem', fontSize: '1.2rem' }}>CONNECT TO UPLINK</a>
        </motion.div>
      </section>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '4rem 4%', textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontFamily: 'Orbitron', fontWeight: 900, marginBottom: '1rem' }}>
          FALCON <span style={{ color: 'var(--primary-color)' }}>TECHNOLOGY</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Neural Ecosystem v4.02. Transmitting from Node-Alpha.
        </p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/management-apps" element={<ManagementDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
