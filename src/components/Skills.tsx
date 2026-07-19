import React, { useState } from 'react';
import { Code2, Server, Layout, Database, Award } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  context: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: <Code2 size={18} />,
      skills: [
        { name: 'C#', level: 'Expert', context: '.NET Core microservices, console applications' },
        { name: 'SQL', level: 'Expert', context: 'Tuning, stored procedures, triggers optimization' },
        { name: 'TypeScript', level: 'Advanced', context: 'Robust type safety for offline React systems' },
        { name: 'JavaScript', level: 'Advanced', context: 'Dynamic frontend features and DOM systems' },
        { name: 'Python', level: 'Intermediate', context: 'Monitoring, alerts, retry scripts' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: <Server size={18} />,
      skills: [
        { name: 'ASP.NET Core Web API', level: 'Expert', context: 'Clean architecture design templates' },
        { name: 'SignalR', level: 'Expert', context: 'Real-time bidirectional message streaming' },
        { name: 'Entity Framework Core', level: 'Expert', context: 'Schema queries, data migrations' },
        { name: 'ADO.NET', level: 'Advanced', context: 'Direct raw SQL command execution' },
        { name: 'Microservices', level: 'Advanced', context: 'Decoupled, message-based backend apps' }
      ]
    },
    {
      title: 'Frontend & State',
      icon: <Layout size={18} />,
      skills: [
        { name: 'React.js', level: 'Expert', context: 'Highly interactive user-friendly client apps' },
        { name: 'Redux / RTK', level: 'Expert', context: 'Consistent cross-app local state caches' },
        { name: 'IndexedDB', level: 'Advanced', context: 'Offline data cache and queueing' },
        { name: 'PrimeReact', level: 'Advanced', context: 'Modern web component UI elements' },
        { name: 'Material-UI', level: 'Advanced', context: 'Cross-browser compatible styled frameworks' }
      ]
    },
    {
      title: 'Database & Cloud',
      icon: <Database size={18} />,
      skills: [
        { name: 'SQL Server', level: 'Expert', context: 'Database design, 97% query acceleration' },
        { name: 'Cosmos DB', level: 'Advanced', context: 'NoSQL container automations' },
        { name: 'AWS S3', level: 'Advanced', context: 'File integration pipelines' },
        { name: 'AWS SQS', level: 'Advanced', context: 'Queue message worker subscribers' },
        { name: 'SSMS', level: 'Expert', context: 'Database profiling and execution plan views' }
      ]
    },
    {
      title: 'Developer Tools',
      icon: <Award size={18} />,
      skills: [
        { name: 'Git & GitHub', level: 'Expert', context: 'CI/CD pipeline hooks, branch structures' },
        { name: 'Postman', level: 'Expert', context: 'API payload testing, automations' },
        { name: 'Swagger', level: 'Advanced', context: 'Exposing interactive API guidelines' },
        { name: 'Jira', level: 'Advanced', context: 'Agile sprints, Scrum workflows' }
      ]
    }
  ];

  return (
    <section id="skills" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="gradient-text">Skills & Technologies</h2>
          <p style={styles.sectionSubtitle}>
            A comprehensive inventory of my languages, frameworks, databases, and workflow optimization tools.
          </p>
        </div>

        {/* Custom tabs selector */}
        <div style={styles.tabSelector}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                ...styles.tabButton,
                color: activeTab === idx ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                backgroundColor: activeTab === idx ? 'rgba(0, 242, 254, 0.06)' : 'transparent',
                borderColor: activeTab === idx ? 'var(--accent-cyan)' : 'var(--border-color)',
              }}
            >
              {cat.icon}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Tab content panel */}
        <div className="glass-card" style={styles.gridContainer}>
          <div style={styles.grid}>
            {categories[activeTab].skills.map((skill, sIdx) => (
              <div key={sIdx} style={styles.skillCard}>
                <div style={styles.skillCardHeader}>
                  <span style={styles.skillName}>{skill.name}</span>
                  <span 
                    style={{
                      ...styles.skillLevel,
                      color: 
                        skill.level === 'Expert' ? 'var(--accent-cyan)' : 
                        skill.level === 'Advanced' ? 'var(--accent-blue)' : '#c084fc',
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
                <p style={styles.skillContext}>{skill.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications footer info */}
        <div style={styles.certsContainer}>
          <h3 style={styles.certsTitle}>Verified Credentials & Certificates</h3>
          <div style={styles.certsGrid}>
            <div className="glass-card" style={styles.certCard}>
              <div style={styles.certBadge}>IBM</div>
              <div>
                <h4 style={styles.certName}>What is Data Science?</h4>
                <p style={styles.certIssuer}>Verified Professional Certification</p>
              </div>
            </div>
            <div className="glass-card" style={styles.certCard}>
              <div style={styles.certBadge}>Michigan</div>
              <div>
                <h4 style={styles.certName}>Python Basics</h4>
                <p style={styles.certIssuer}>University of Michigan</p>
              </div>
            </div>
            <div className="glass-card" style={styles.certCard}>
              <div style={styles.certBadge}>UC</div>
              <div>
                <h4 style={styles.certName}>JavaScript Basics</h4>
                <p style={styles.certIssuer}>University of California</p>
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
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
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
  tabSelector: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  gridContainer: {
    padding: '2.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  skillCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transition: 'var(--transition-fast)',
    textAlign: 'left',
  },
  skillCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontWeight: 700,
    fontSize: '1.05rem',
  },
  skillLevel: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
  },
  skillContext: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.4,
  },
  certsContainer: {
    marginTop: '4rem',
  },
  certsTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  certsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  certCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 1.5rem',
    textAlign: 'left',
  },
  certBadge: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 242, 254, 0.08)',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '0.8rem',
    color: 'var(--accent-cyan)',
    flexShrink: 0,
  },
  certName: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  certIssuer: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
};
