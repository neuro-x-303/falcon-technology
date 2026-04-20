import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <img src="/logo-colored.jpeg" alt="Falcon Technology Logo" className="nav-logo" />
          <span className="nav-title">FALCON TECH</span>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <img src="/logo.jpeg" alt="Background Element" className="hero-bg-logo" />
        <div className="hero-content">
          <span className="hero-badge">Next-Generation Technology</span>
          <h1 className="hero-title">
            Architecting the Future of <span>Digital Solutions</span>
          </h1>
          <p className="hero-description">
            At Falcon Technology, we are pioneers in building cutting-edge applications and
            infrastructure. We specialize in advanced AI modeling, bespoke App development,
            and scalable API engineering to drive your business into the tomorrow.
          </p>
          <button className="hero-cta">Explore Our Technologies</button>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="section-header">
          <h2>Our Core Technologies</h2>
          <p>Delivering state-of-the-art software solutions tailored for modern enterprise needs.</p>
        </div>
        <div className="services-grid">
          {/* Card 1 */}
          <div className="service-card">
            <div className="card-icon">🧠</div>
            <h3>AI Modeling & ML</h3>
            <p>
              We build, train, and deploy advanced Artificial Intelligence models.
              From predictive analytics to computer vision and natural language processing,
              our custom AI solutions automate workflows and extract deep actionable intelligence.
            </p>
          </div>

          {/* Card 2 */}
          <div className="service-card">
            <div className="card-icon">📱</div>
            <h3>App Development</h3>
            <p>
              End-to-end full-stack application development. We create stunning,
              high-performance web and mobile applications utilizing the latest
              frameworks and immersive UI/UX design patterns.
            </p>
          </div>

          {/* Card 3 */}
          <div className="service-card">
            <div className="card-icon">⚡</div>
            <h3>API Development</h3>
            <p>
              Robust, secure, and infinitely scalable API infrastructure. We engineer
              RESTful and GraphQL backends optimized for blazingly fast response times,
              ensuring seamless integrations across all platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Falcon Technology. Built with AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
