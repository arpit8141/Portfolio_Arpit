import React, { useState } from 'react';
import { Layers, Shield, Cpu, Cloud, Smartphone } from 'lucide-react';

interface LayerDetails {
  name: string;
  icon: React.ReactNode;
  responsibilities: string[];
  technologies: string[];
  description: string;
  dependencyDirection: string;
}

export const ArchitectureVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers: LayerDetails[] = [
    {
      name: 'Client Interface Layer',
      icon: <Smartphone size={20} />,
      description: 'The outermost UI tier representing user interface components, client-side caching, and real-time sockets.',
      responsibilities: [
        'Render interactive dashboard UI (React + TypeScript)',
        'Manage offline states (Redux state, IndexedDB cache)',
        'SignalR real-time client endpoints to receive pushes'
      ],
      technologies: ['React.js', 'Redux Toolkit', 'IndexedDB', 'PrimeReact', 'CSS3 Modules'],
      dependencyDirection: 'Depends on Web API / Core'
    },
    {
      name: 'Web API / Controller Layer',
      icon: <Shield size={20} />,
      description: 'The entrypoint for remote HTTP traffic. Exposes versioned REST APIs, handles JWT authentication/authorization, and orchestrates real-time SignalR hubs.',
      responsibilities: [
        'Expose ASP.NET Core Controller endpoints',
        'Authentication filters (JWT, OAuth Bearer validation)',
        'SignalR Hub notification endpoints'
      ],
      technologies: ['ASP.NET Core Web API', 'SignalR', 'JWT Bearer Auth', 'Swagger/OpenAPI'],
      dependencyDirection: 'Depends on Application Core Services'
    },
    {
      name: 'Infrastructure Layer',
      icon: <Cloud size={20} />,
      description: 'Provides data persistence, messaging, reporting generators, and external cloud integrations.',
      responsibilities: [
        'Entity Framework Core DB Context migrations',
        'AWS S3 files storage & AWS SQS event worker consumers',
        'PDF/PPT automated reporting generators'
      ],
      technologies: ['EF Core', 'SQL Server', 'AWS S3', 'AWS SQS', 'Cosmos DB'],
      dependencyDirection: 'Depends on Application Core / Interfaces'
    },
    {
      name: 'Domain & Core Layer',
      icon: <Cpu size={20} />,
      description: 'The inner heart of the system containing business logic, models, rules, interfaces, and contracts. It has absolutely zero external dependencies.',
      responsibilities: [
        'Business entities, domain models, and aggregates',
        'Repository and unit-of-work interface declarations',
        'Inward-pointing abstract specifications'
      ],
      technologies: ['C# POCO Entities', 'Interface definitions', 'Domain exceptions'],
      dependencyDirection: 'Zero external dependencies (Pure Core)'
    }
  ];

  return (
    <section id="architecture" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="gradient-text">Clean Architecture Visualizer</h2>
          <p style={styles.sectionSubtitle}>
            An interactive breakdown of full-stack decoupled engineering. Click on any layer to see its responsibilities, tech stack, and structural details.
          </p>
        </div>

        <div style={styles.visualizerGrid}>
          {/* Stack Stack visualizer */}
          <div style={styles.stackContainer}>
            {layers.map((layer, idx) => {
              const isActive = activeLayer === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  style={{
                    ...styles.layerItem,
                    borderColor: isActive ? 'var(--accent-cyan)' : 'var(--border-color)',
                    backgroundColor: isActive ? 'rgba(0, 242, 254, 0.05)' : 'rgba(15, 20, 34, 0.4)',
                    transform: isActive ? 'scale(1.02) translateY(-2px)' : 'none',
                    boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  }}
                >
                  <div style={styles.layerInfoLeft}>
                    <div 
                      style={{
                        ...styles.layerIconContainer,
                        color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      }}
                    >
                      {layer.icon}
                    </div>
                    <span style={{ ...styles.layerName, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {layer.name}
                    </span>
                  </div>
                  
                  {/* Arrow indicating dependency direction (all inward!) */}
                  <div style={styles.dependencyIndicator}>
                    <span style={styles.dependencyText}>inward dependency</span>
                    <span style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>↓</span>
                  </div>
                </div>
              );
            })}
            <div style={styles.coreCenter}>
              <Layers size={16} style={{ color: 'var(--accent-purple)', marginRight: '6px' }} />
              <span style={{ fontWeight: 600 }}>Inner Core Domain</span>
            </div>
          </div>

          {/* Details Card */}
          <div className="glass-card" style={styles.detailsCard}>
            <div style={styles.detailsHeader}>
              <span style={styles.activeLayerLabel}>Layer Details</span>
              <h3 style={styles.activeLayerTitle}>{layers[activeLayer].name}</h3>
            </div>
            
            <p style={styles.detailsDescription}>{layers[activeLayer].description}</p>
            
            <div style={styles.divider}></div>
            
            <div style={styles.detailsSection}>
              <h4 style={styles.detailsSubtitle}>Key Responsibilities</h4>
              <ul style={styles.bulletsList}>
                {layers[activeLayer].responsibilities.map((resp, idx) => (
                  <li key={idx} style={styles.bulletItem}>
                    <span style={styles.bulletDot}>•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.detailsSection}>
              <h4 style={styles.detailsSubtitle}>Technologies & Libraries</h4>
              <div style={styles.tagsContainer}>
                {layers[activeLayer].technologies.map((tech) => (
                  <span key={tech} style={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>

            <div style={{ ...styles.detailsSection, marginTop: 'auto' }}>
              <div style={styles.dependencyBox}>
                <strong>Dependency Status:</strong> {layers[activeLayer].dependencyDirection}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '5rem 0',
    borderTop: '1px solid var(--border-color)',
    position: 'relative',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3.5rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '0.75rem',
  },
  sectionSubtitle: {
    color: 'var(--text-secondary)',
    maxWidth: '750px',
    margin: '0 auto',
    fontSize: '1rem',
  },
  visualizerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '3rem',
    alignItems: 'stretch',
  },
  stackContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  layerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 1.5rem',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  layerInfoLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  layerIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  layerName: {
    fontWeight: 600,
    fontSize: '1.05rem',
  },
  dependencyIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dependencyText: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  coreCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    border: '1px dashed var(--accent-purple)',
    borderRadius: '10px',
    backgroundColor: 'rgba(127, 0, 255, 0.02)',
    color: 'var(--accent-purple)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    userSelect: 'none',
  },
  detailsCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2.5rem',
  },
  detailsHeader: {
    marginBottom: '1.5rem',
  },
  activeLayerLabel: {
    color: 'var(--accent-cyan)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '4px',
  },
  activeLayerTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  detailsDescription: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.5rem 0',
  },
  detailsSection: {
    marginBottom: '1.5rem',
  },
  detailsSubtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    fontWeight: 600,
    marginBottom: '0.75rem',
  },
  bulletsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bulletItem: {
    display: 'flex',
    gap: '8px',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.4,
  },
  bulletDot: {
    color: 'var(--accent-cyan)',
    fontWeight: 'bold',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  techTag: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  dependencyBox: {
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
};
