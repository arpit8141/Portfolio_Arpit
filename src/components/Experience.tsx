import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, TrendingUp } from 'lucide-react';

interface Position {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  stats?: string;
  skillsUsed: string[];
}

export const Experience: React.FC = () => {
  const experiences: Position[] = [
    {
      company: 'AaNeel Technology Solutions',
      role: 'Fullstack Software Developer',
      period: 'Feb. 2026 – Current',
      location: 'Ahmedabad, Gujarat',
      achievements: [
        'Developed a high-performance offline-first web application using React, Redux, and indexedDB, ensuring full application functionality and data persistence during network outages.',
        'Engineered a synchronization service to manage bidirectional data flow between the web client and server, resolving data conflicts to maintain consistency across the platform.',
        'Built a real-time notification system using SignalR and .NET Core microservices to deliver targeted push notifications to individual users, specific groups, and the entire user base.',
        'Created .NET Core console utilities to automate bulk data updates in Cosmos DB containers by processing Excel sheets, significantly reducing manual data entry and improving accuracy.'
      ],
      stats: 'Zero-downtime offline data resilience implemented',
      skillsUsed: ['React', 'Redux', 'IndexedDB', '.NET Core API', 'SignalR', 'Cosmos DB', 'Microservices']
    },
    {
      company: 'Binary Republik',
      role: 'Fullstack Software Developer',
      period: 'Jan. 2023 – Jan. 2026',
      location: 'Ahmedabad, Gujarat',
      achievements: [
        'Built and maintained secure and scalable healthcare and HRMS applications using AWS, ASP.NET Core MVC, Entity Framework Core, ADO.NET, and SQL Server.',
        'Developed a .NET Core console application integrating with AWS SQS and S3 to process SQLite database files, migrate data into SQL Server, and upload results back to S3.',
        'Designed and optimized SQL Server databases, creating stored procedures, triggers, and performance-tuned queries to resolve job bottlenecks and reduce execution time by 97%.',
        'Built a Python-based monitoring and retry system for AWS SQS/S3 workflows, reducing manual intervention by 50%.',
        'Developed a full-stack HRMS platform using ASP.NET Core MVC and SQL Server following Clean Architecture across Core, Infrastructure, Service, and Web layers.',
        'Implemented authentication and authorization using JWT and OAuth, strengthening application security and protecting sensitive data.',
        'Designed and developed a centralized reporting service in .NET Core to automate PDF and PPT exports, streamlining reporting processes.'
      ],
      stats: 'SQL Query execution times reduced by 97%',
      skillsUsed: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'AWS S3/SQS', 'Python', 'JWT/OAuth', 'React', 'TypeScript']
    }
  ];

  return (
    <section id="experience" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="gradient-text">Work Experience</h2>
          <p style={styles.sectionSubtitle}>
            A timeline of my professional career as a full-stack engineer, delivering high-performance tools and stable architectures.
          </p>
        </div>

        <div style={styles.timelineContainer}>
          {experiences.map((exp, idx) => (
            <div key={idx} style={styles.timelineItem}>
              {/* Vertical line pointer */}
              <div style={styles.timelineMarkerContainer}>
                <div style={styles.timelineMarker}>
                  <Briefcase size={16} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                {idx < experiences.length - 1 && <div style={styles.timelineLine}></div>}
              </div>

              {/* Core card */}
              <div className="glass-card" style={styles.timelineCard}>
                <div style={styles.cardHeader}>
                  <div>
                    <h3 style={styles.companyName}>{exp.company}</h3>
                    <h4 style={styles.roleTitle}>{exp.role}</h4>
                  </div>
                  <div style={styles.metaContainer}>
                    <div style={styles.metaItem}>
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {exp.stats && (
                  <div style={styles.statsCallout}>
                    <TrendingUp size={16} style={{ color: 'var(--accent-cyan)', marginRight: '8px' }} />
                    <span style={{ fontWeight: 600 }}>Performance Impact: </span>
                    <span style={{ color: 'var(--text-primary)', marginLeft: '4px' }}>{exp.stats}</span>
                  </div>
                )}

                <ul style={styles.bulletsList}>
                  {exp.achievements.map((achievement, aIdx) => (
                    <li key={aIdx} style={styles.bulletItem}>
                      <CheckCircle size={14} style={styles.bulletIcon} />
                      <span style={styles.bulletText}>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div style={styles.skillsContainer}>
                  {exp.skillsUsed.map((skill) => (
                    <span key={skill} style={styles.skillBadge}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
    marginBottom: '4rem',
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
  timelineContainer: {
    position: 'relative',
    maxWidth: '850px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '2rem',
  },
  timelineMarkerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timelineMarker: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-secondary)',
    border: '2px solid var(--accent-cyan)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    boxShadow: '0 0 10px rgba(0, 242, 254, 0.2)',
  },
  timelineLine: {
    width: '2px',
    flex: 1,
    backgroundColor: 'var(--border-color)',
    marginTop: '0.5rem',
    marginBottom: '-3rem',
  },
  timelineCard: {
    flex: 1,
    padding: '2rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1rem',
  },
  companyName: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  roleTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--accent-cyan)',
    fontFamily: 'var(--font-mono)',
  },
  metaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-end',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
  statsCallout: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
    border: '1px solid rgba(0, 242, 254, 0.15)',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '1.25rem',
  },
  bulletsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  bulletIcon: {
    color: 'var(--accent-cyan)',
    marginTop: '4px',
    flexShrink: 0,
  },
  bulletText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    textAlign: 'left',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '1rem',
  },
  skillBadge: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '2px 8px',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
  },
};
