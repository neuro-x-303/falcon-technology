import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ManagementDashboard from './components/ManagementDashboard';

// Landing Page Component (Repurposed from previous)
const LandingPage = () => {
  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <span className="hero-badge">Falcon Technology Ecosystem</span>
          <h1 className="hero-title">
            Empowering <span>Digital Evolution</span>
          </h1>
          <p className="hero-description">
            We build state-of-the-art infrastructure for the next generation of 
            technology companies. From AI modeling to complex management systems.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a href="/management-apps" className="hero-cta">Go to Management Apps</a>
            <button className="hero-cta" style={{ background: 'transparent', border: '1px solid var(--primary-color)' }}>
              Explore Services
            </button>
          </div>
        </div>
      </header>

      <section className="services">
        <div className="section-header">
          <h2>Our Architecture</h2>
          <p>Seamlessly integrated solutions for modern enterprises.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="card-icon">🏗️</div>
            <h3>System Management</h3>
            <p>Full control over your app development lifecycle with our specialized management tools.</p>
          </div>
          <div className="service-card">
            <div className="card-icon">🛡️</div>
            <h3>Enterprise Security</h3>
            <p>Bank-grade security protocols integrated into every line of code we deploy.</p>
          </div>
          <div className="service-card">
            <div className="card-icon">🚀</div>
            <h3>Scalable Growth</h3>
            <p>Infrastructure designed to grow with your user base, ensuring 100% uptime.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Falcon Technology. All rights reserved.</p>
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
          {/* Redirect any other Falcon Rental related links if needed */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
