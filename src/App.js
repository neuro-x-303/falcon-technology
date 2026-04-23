import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import SystemTerminal from './pages/SystemTerminal';

// Landing Page Component (Transformed into Innovation Hub)
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-badge"
          >
            <span className="badge-dot"></span>
            WELCOME TO THE FUTURE
          </motion.div>
          
          <h1 className="hero-title tech-gradient-text">
            WELCOME TO THE FUTURE
          </h1>
          
          <h2 className="hero-quote">
            "Turn your imagination into reality"
          </h2>
          
          <p className="hero-description">
            Share your vision with us, and we will engineer it. From advanced AI/ML models to 
            robust backend architectures and high-fidelity applications, we build the future you imagine.
          </p>
          
          <div className="hero-actions">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/systemterminal" className="primary-btn">
                SHARE YOUR IDEA
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={() => alert("COMING SOON // Neural Ecosystem v5.0 is under synchronization.")}
                className="secondary-btn"
                style={{ background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}
              >
                OUR ECOSYSTEM
              </button>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Services Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">OUR EXPERTISE</span>
          <h2 className="tech-gradient-text">WHAT WE BUILD</h2>
          <p>YOUR IDEAS, OUR ENGINEERING PRECISION</p>
        </div>

        <div className="features-grid">
          {[
            { title: 'AI & Machine Learning', desc: 'Transforming complex data into intelligent autonomous systems and predictive models.', icon: '🧠', color: 'var(--primary-color)', link: '/systemterminal' },
            { title: 'App Development', desc: 'Crafting high-performance web and mobile applications with premium user experiences.', icon: '📱', color: 'var(--secondary-color)', link: '/management-apps/index.html' },
            { title: 'API & Backend', desc: 'Building scalable, ultra-secure digital infrastructure and seamless data orchestration.', icon: '⚙️', color: 'var(--accent-color)', link: '/systemterminal' }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="feature-card glass-card"
              style={{ cursor: 'pointer' }}
              onClick={() => window.location.href = s.link}
            >
              <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${s.color}33, transparent 70%)` }}></div>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container glass-card">
          {[
            { label: 'Ideas Realized', val: '150+' },
            { label: 'Active Projects', val: '42' },
            { label: 'Deployment Speed', val: 'Ultra-Fast' },
            { label: 'Success Rate', val: '99.9%' }
          ].map((st, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value tech-gradient-text">{st.val}</span>
              <span className="stat-label">{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>HAVE A <span className="tech-gradient-text">VISION?</span></h2>
          <p>Don't just dream it. Let's build it together. Uplink your idea to our neural mesh today.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/systemterminal" className="primary-btn large">
              START A PROJECT
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-brand">
          FALCON <span className="highlight">TECHNOLOGY</span>
        </div>
        <p className="footer-tagline">
          Turning synthetic imagination into enterprise reality. 
          Architecting the future, one project at a time.
        </p>
        <div className="footer-meta">
          &copy; {new Date().getFullYear()} FALCON INNOVATION HUB // ALL RIGHTS RESERVED.
        </div>
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
          <Route path="/systemterminal" element={<SystemTerminal />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
