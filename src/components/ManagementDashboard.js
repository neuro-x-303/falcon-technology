import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Binary, 
  Layers, 
  Network,
  Plus,
  Terminal,
  Search,
  Maximize2
} from 'lucide-react';

const NeuralCard = ({ title, value, icon: Icon, change, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="service-card glass-container"
    style={{ 
      borderColor: color || 'var(--glass-border)', 
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div className="card-glow" style={{ 
      position: 'absolute', 
      top: '-50%', 
      left: '-50%', 
      width: '200%', 
      height: '200%', 
      background: `radial-gradient(circle, ${color || 'var(--primary-color)'}11 0%, transparent 70%)`,
      pointerEvents: 'none'
    }}></div>
    <div className="stat-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div className="card-icon" style={{ color: color || 'var(--primary-color)' }}><Icon size={24} /></div>
      <span className={`stat-trend ${trend}`} style={{ 
        fontSize: '0.7rem', 
        fontFamily: 'monospace',
        color: trend === 'up' ? 'var(--success)' : 'var(--accent-color)',
        padding: '0.2rem 0.6rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '4px',
        border: `1px solid ${trend === 'up' ? 'var(--success)44' : 'var(--accent-color)44'}`
      }}>{change}</span>
    </div>
    <div className="stat-body">
      <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0', fontFamily: 'Orbitron' }}>{value}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</p>
    </div>
    <div className="card-scanner" style={{ 
      height: '1px', 
      background: color || 'var(--primary-color)', 
      width: '100%', 
      position: 'absolute',
      bottom: '0',
      left: '0',
      opacity: '0.5',
      animation: 'scan-vertical 3s infinite linear' 
    }}></div>
  </motion.div>
);

const ArchitectureRow = ({ name, type, health, throughPut, uptime }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ background: 'rgba(255,255,255,0.03)' }}
      className="project-row" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1.2fr 1fr 1fr 0.5fr', 
        padding: '1.2rem 2rem', 
        borderBottom: '1px solid var(--glass-border)',
        alignItems: 'center'
      }}
    >
      <div className="project-info" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div className="project-type-icon" style={{ 
          background: 'rgba(0, 243, 255, 0.05)',
          border: '1px solid var(--glass-border)', 
          padding: '8px', 
          borderRadius: '12px' 
        }}>
          {type === 'Neural' ? <Network size={18} color="var(--primary-color)" /> : type === 'API' ? <Layers size={18} color="var(--secondary-color)" /> : <Binary size={18} color="var(--accent-color)" />}
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>{name}</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>NODE://{name.toLowerCase().replace(/ /g, '-')}</p>
        </div>
      </div>
      <div className="project-status">
        <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${health}%` }}
            style={{ 
              height: '100%', 
              background: health > 90 ? 'var(--success)' : health > 80 ? 'var(--secondary-color)' : 'var(--accent-color)',
              boxShadow: `0 0 10px ${health > 90 ? 'var(--success)' : 'var(--accent-color)'}aa`
            }} 
          />
        </div>
        <span style={{ fontSize: '0.75rem', marginLeft: '10px', color: health > 90 ? 'var(--success)' : 'var(--accent-color)' }}>{health}%</span>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{throughPut} Hz</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{uptime}</div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="icon-btn" style={{ color: 'var(--text-secondary)' }}><Terminal size={16} /></button>
        <button className="icon-btn" style={{ color: 'var(--text-secondary)' }}><Maximize2 size={16} /></button>
      </div>
    </motion.div>
  );
};

const ManagementDashboard = () => {
  const metrics = [
    { title: 'Processing Power', value: '1.2 PFLOPS', icon: Cpu, change: '+14%', trend: 'up', color: 'var(--primary-color)' },
    { title: 'Neural Latency', value: '0.82 ms', icon: Zap, change: '-0.12ms', trend: 'up', color: 'var(--secondary-color)' },
    { title: 'Security Matrix', value: 'Level 9', icon: ShieldAlert, change: 'Optimal', trend: 'up', color: 'var(--accent-color)' },
    { title: 'Active Syllables', value: '4.2B', icon: Activity, change: '+200M', trend: 'up', color: '#10b981' },
  ];

  const architectures = [
    { name: 'Primary Brain Alpha', type: 'Neural', health: 98, throughPut: '85.4k', uptime: '99.9% uptime' },
    { name: 'Edge Node Gamma', type: 'System', health: 95, throughPut: '12.1k', uptime: '98.5% uptime' },
    { name: 'API Uplink Sigma', type: 'API', health: 88, throughPut: '45.0k', uptime: '99.2% uptime' },
    { name: 'Core Mesh Delta', type: 'Neural', health: 99, throughPut: '120.4k', uptime: '100% uptime' },
    { name: 'Legacy Proxy Zeta', type: 'System', health: 76, throughPut: '2.5k', uptime: '91.0% uptime' },
  ];

  return (
    <main className="dashboard">
      <div className="dashboard-overlay" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <header className="dashboard-header" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ fontSize: '2.8rem', fontFamily: 'Orbitron', fontWeight: 900 }}
          >
            SYSTEM <span style={{ color: 'var(--primary-color)', textShadow: 'var(--cyan-glow)' }}>TERMINAL</span>
          </motion.h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></span>
              NETWORK ACTIVE
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
              UPLINK: 21.09.2026.UTC
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="search-container" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Search size={18} />
            <input type="text" placeholder="Search architecture nodes..." />
          </div>
          <button className="hero-cta" style={{ borderRadius: '8px', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
            <Plus size={18} /> NEW NODE
          </button>
        </div>
      </header>

      <section className="stats-grid" style={{ position: 'relative', zIndex: 1 }}>
        {metrics.map((metric, i) => (
          <NeuralCard key={i} {...metric} />
        ))}
      </section>

      <section className="projects-section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-inline" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'Orbitron', letterSpacing: '3px', color: 'var(--text-primary)' }}>
            ACTIVE <span style={{ color: 'var(--secondary-color)' }}>LAYERS</span>
          </h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="text-btn" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>FILTER: ALL</button>
            <button className="text-btn" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>SORT: HEALTH</button>
          </div>
        </div>

        <div className="projects-table glass-container" style={{ background: 'rgba(2, 6, 23, 0.4)' }}>
          <div className="table-header" style={{ 
            gridTemplateColumns: '2fr 1.2fr 1fr 1fr 0.5fr',
            background: 'rgba(0, 243, 255, 0.02)',
            fontSize: '0.7rem',
            letterSpacing: '2px'
          }}>
            <span>NODE IDENTIFIER</span>
            <span>DIAGNOSTIC HEALTH</span>
            <span>THROUGHPUT</span>
            <span>UPTIME LOG</span>
            <span>ACTIONS</span>
          </div>
          <div className="table-body">
            {architectures.map((arch, i) => (
              <ArchitectureRow key={i} {...arch} />
            ))}
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes scan-vertical {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
};

export default ManagementDashboard;

