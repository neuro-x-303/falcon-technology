import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Smartphone, 
  Globe,
  MoreVertical,
  Plus
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="service-card stat-card"
  >
    <div className="stat-header">
      <div className="card-icon"><Icon size={20} /></div>
      <span className={`stat-trend ${trend}`}>{change}</span>
    </div>
    <div className="stat-body">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </motion.div>
);

const ProjectRow = ({ name, type, status, progress, team }) => {
  const getStatusColor = (s) => {
    switch(s) {
      case 'On Track': return 'var(--success)';
      case 'Delayed': return 'var(--accent-color)';
      case 'Review': return 'var(--warning)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="project-row">
      <div className="project-info">
        <div className="project-type-icon">
          {type === 'Mobile' ? <Smartphone size={16} /> : type === 'Web' ? <Globe size={16} /> : <Code2 size={16} />}
        </div>
        <div>
          <h4>{name}</h4>
          <p>{type} App Development</p>
        </div>
      </div>
      <div className="project-status">
        <span className="status-dot" style={{ backgroundColor: getStatusColor(status) }}></span>
        {status}
      </div>
      <div className="project-progress">
        <div className="progress-bar">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="progress-fill"
          ></motion.div>
        </div>
        <span>{progress}%</span>
      </div>
      <div className="project-team">
        <div className="avatar-group">
          {team.map((m, i) => (
            <div key={i} className="mini-avatar" title={m}>{m[0]}</div>
          ))}
        </div>
      </div>
      <button className="icon-btn"><MoreVertical size={16} /></button>
    </div>
  );
};

const ManagementDashboard = () => {
  const stats = [
    { title: 'Active Projects', value: '12', icon: TrendingUp, change: '+2.5%', trend: 'up' },
    { title: 'Hours Tracked', value: '1,280', icon: Clock, change: '+12%', trend: 'up' },
    { title: 'Completed Tasks', value: '458', icon: CheckCircle2, change: '+5%', trend: 'up' },
    { title: 'Critical Issues', value: '3', icon: AlertCircle, change: '-2', trend: 'down' },
  ];

  const projects = [
    { name: 'Falcon Rental V2', type: 'Mobile', status: 'On Track', progress: 75, team: ['AS', 'JD', 'RK'] },
    { name: 'ERP Enterprise', type: 'Web', status: 'Review', progress: 92, team: ['ML', 'SK'] },
    { name: 'Payment Gateway', type: 'System', status: 'Delayed', progress: 45, team: ['TH', 'BW', 'NP'] },
    { name: 'Learning CRM', type: 'Web', status: 'On Track', progress: 30, team: ['AS', 'PK'] },
  ];

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            System <span>Overview</span>
          </motion.h1>
          <p>Welcome back, Shree. Here's what's happening today.</p>
        </div>
        <button className="hero-cta btn-new-project">
          <Plus size={18} /> New Project
        </button>
      </header>

      <section className="stats-grid">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </section>

      <section className="projects-section-container">
        <div className="section-header-inline">
          <h2>Active Projects</h2>
          <button className="text-btn">View All</button>
        </div>
        <div className="projects-table glass-container">
          <div className="table-header">
            <span>Project Name</span>
            <span>Status</span>
            <span>Progress</span>
            <span>Team</span>
            <span></span>
          </div>
          <div className="table-body">
            {projects.map((proj, i) => (
              <ProjectRow key={i} {...proj} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManagementDashboard;
