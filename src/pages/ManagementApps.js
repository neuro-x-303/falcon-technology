import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Library, 
  School, 
  Briefcase, 
  ChevronRight,
  Code2
} from 'lucide-react';

const AppCard = ({ title, desc, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass-container neon-border"
    style={{ 
      padding: '2.5rem', 
      textAlign: 'left',
      background: 'rgba(2, 6, 23, 0.6)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ 
      position: 'absolute', 
      top: '-20px', 
      right: '-20px', 
      width: '100px', 
      height: '100px', 
      background: color, 
      filter: 'blur(60px)', 
      opacity: '0.1' 
    }}></div>
    
    <div className="card-icon" style={{ 
      background: `${color}11`, 
      width: '60px', 
      height: '60px', 
      borderRadius: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: '1.5rem',
      border: `1px solid ${color}33`
    }}>
      <Icon size={32} color={color} />
    </div>
    
    <h3 style={{ fontSize: '1.5rem', fontFamily: 'Orbitron', marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{desc}</p>
    
    <button style={{ 
      background: 'none', 
      border: 'none', 
      color: color, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      fontSize: '0.9rem', 
      fontWeight: '600',
      cursor: 'pointer'
    }}>
      VIEW ARCHITECTURE <ChevronRight size={16} />
    </button>
  </motion.div>
);

const ManagementApps = () => {
  const apps = [
    { 
      title: 'Construction Site Management', 
      desc: 'Real-time workforce tracking, material logistics, and structural integrity monitoring via neural sensors.', 
      icon: Building2, 
      color: '#00f3ff' 
    },
    { 
      title: 'Library Management', 
      desc: 'Autonomous indexing and semantic search architectures for massive knowledge repositories.', 
      icon: Library, 
      color: '#7b2ff7' 
    },
    { 
      title: 'School Management', 
      desc: 'Next-gen student cognitive analytics and hyper-personalized learning path synthesis.', 
      icon: School, 
      color: '#ff007a' 
    },
    { 
      title: 'Office Management', 
      desc: 'Enterprise-grade resource orchestration and smart environment automation for high-performance teams.', 
      icon: Briefcase, 
      color: '#10b981' 
    }
  ];

  return (
    <div className="management-apps-page" style={{ padding: '6rem 4%' }}>
      <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="hero-badge neon-border" style={{ marginBottom: '1rem' }}>
            SYNTHETIC ECOSYSTEMS // ACTIVE
          </span>
          <h1 className="tech-gradient-text" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
            MANAGEMENT APPS DEVELOPMENT
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            We architect and synthesize autonomous management platforms powered by neural logic, 
            designed for enterprise scalability and high-fidelity operation.
          </p>
        </motion.div>
      </header>

      <div className="apps-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {apps.map((app, i) => (
          <AppCard key={i} {...app} />
        ))}
      </div>

      <section style={{ marginTop: '10rem', textAlign: 'center' }}>
        <div className="glass-container" style={{ padding: '5rem', background: 'rgba(0, 243, 255, 0.02)' }}>
          <Code2 size={48} color="var(--primary-color)" style={{ marginBottom: '2rem' }} />
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'Orbitron', marginBottom: '1.5rem' }}>CUSTOM <span className="tech-gradient-text">SYNTHESIS</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}>
            Need a bespoke neural architecture for your specific industry? 
            Our engineering team specializes in deep-tech synthesis tailored to unique enterprise requirements.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button className="hero-cta" style={{ padding: '1rem 3rem' }}>REQUEST SPEC</button>
            <button className="hero-cta" style={{ background: 'transparent', border: '1px solid var(--primary-color)', color: '#fff', padding: '1rem 3rem' }}>CONSULT AGENT</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementApps;
