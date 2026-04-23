import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import SystemTerminal from './pages/SystemTerminal';
import ThreeBackground from './components/ThreeBackground';

// Landing Page Component (Transformed into AI Tech Platform)
const LandingPage = () => {
  return (
    <div className="landing-page-container">
      {/* Hero Section */}
      <header className="hero">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-badge neon-border"
          >
            NEURAL PROTOCOL v4.02 // ACTIVE
          </motion.div>
          <h1 className="hero-title" style={{ fontSize: '6rem', lineHeight: '1', margin: '1rem 0', fontWeight: '900' }}>
            ENGINEERING THE <br/>
            <span className="tech-gradient-text" style={{ textShadow: 'var(--neural-glow)' }}>FUTURE OF COGNITION</span>
          </h1>
          <p className="hero-description" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '2.5rem auto', color: 'var(--text-secondary)' }}>
            Falcon Technology develops high-fidelity neural architectures, autonomous app ecosystems, 
            and enterprise-grade API synthesis for the next era of synthetic intelligence.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '4rem' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/systemterminal" 
                className="hero-cta"
                style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem', fontWeight: 'bold', display: 'inline-block', textDecoration: 'none', borderRadius: '12px' }}
              >
                INITIALIZE TERMINAL
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="/management-apps/index.html" 
                className="hero-cta" 
                style={{ background: 'transparent', border: '1px solid var(--primary-color)', color: '#fff', padding: '1.2rem 3.5rem', textDecoration: 'none', display: 'inline-block', borderRadius: '12px' }}
              >
                MANAGEMENT APPS
              </a>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Capabilities Section */}
      <section className="services" style={{ padding: '12rem 4%' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="tech-gradient-text" 
            style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
          >
            CORE ARCHITECTURES
          </motion.h2>
          <p style={{ letterSpacing: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>DEEP-TECH SOLUTIONS FOR THE SYNTHETIC FRONTIER</p>
        </div>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          {[
            { title: 'Neural Modeling', desc: 'Custom synthetic brains trained on proprietary datasets for hyper-accurate predictive analysis.', icon: '🧠', color: 'var(--primary-color)' },
            { title: 'App Synthesis', desc: 'Automated generation of high-fidelity management platforms with real-time neural integration.', icon: '⚡', color: 'var(--secondary-color)' },
            { title: 'API Orchestration', desc: 'Ultra-low latency data bridges connecting decentralized intelligence nodes globally.', icon: '🌐', color: 'var(--accent-color)' }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -20, boxShadow: `0 30px 60px ${s.color}22` }} 
              className="service-card glass-container neon-border" 
              style={{ padding: '4rem 3rem', textAlign: 'center', background: 'rgba(2, 6, 23, 0.4)' }}
            >
              <div className="card-icon" style={{ fontSize: '4rem', marginBottom: '2.5rem' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'Orbitron', fontWeight: '700' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '10rem 4%', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="stats-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
          {[
            { label: 'Neural Throughput', val: '84.2 TB/s' },
            { label: 'Active Nodes', val: '4,209' },
            { label: 'Global Latency', val: '< 0.08ms' },
            { label: 'Model Accuracy', val: '99.992%' }
          ].map((st, i) => (
            <motion.div 
              key={i} 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <h4 className="tech-gradient-text" style={{ fontSize: '3rem', fontFamily: 'Orbitron', fontWeight: '900' }}>{st.val}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '1rem' }}>{st.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Mesh Section - Call to Action */}
      <section style={{ padding: '15rem 4%', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'var(--primary-color)', filter: 'blur(200px)', opacity: '0.05', pointerEvents: 'none' }}></div>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '4.5rem', fontFamily: 'Orbitron', marginBottom: '2rem', fontWeight: '900' }}>READY TO <span className="tech-gradient-text">UPLINK?</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>Join the mesh and orchestrate your neural destiny today with Falcon Technology.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/systemterminal" 
              className="hero-cta" 
              style={{ borderRadius: '12px', padding: '1.5rem 5rem', fontSize: '1.3rem', textDecoration: 'none', display: 'inline-block' }}
            >
              CONNECT TO UPLINK
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '6rem 4%', textAlign: 'center', background: 'rgba(2, 6, 23, 0.8)' }}>
        <div style={{ fontSize: '1.8rem', fontFamily: 'Orbitron', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '4px' }}>
          FALCON <span style={{ color: 'var(--primary-color)' }}>TECHNOLOGY</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Pioneering the synthesis of artificial intelligence and enterprise management. 
          Architecting the future, one node at a time.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          &copy; {new Date().getFullYear()} NEURAL ECOSYSTEM v4.02 // ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};


function App() {
  return (
    <Router>
      <div className="App">
        <ThreeBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/systemterminal" element={<SystemTerminal />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
