import React, { useState } from 'react';
import { Terminal, FileSpreadsheet, Play, CheckCircle2, Cloud, Database, RefreshCw } from 'lucide-react';

interface MigrationStats {
  totalRows: number;
  inserted: number;
  failed: number;
  elapsedTime: string;
}

export const ConsoleUtilitySimulator: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'cosmos' | 'aws'>('cosmos');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'dotnet run --project CosmosDBBulkImporter.csproj',
    'Microsoft .NET Core CLI v9.0.100',
    'Ready. Select a mock Excel file or launch S3/SQS migration utility.'
  ]);
  const [stats, setStats] = useState<MigrationStats | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setConsoleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSelectFile = (fileName: string) => {
    setSelectedFile(fileName);
    setStats(null);
    setConsoleLogs([
      `dotnet run --project CosmosDBBulkImporter.csproj`,
      `[CosmosDBBulkImporter] Registered mock file: ${fileName}`,
      `[CosmosDBBulkImporter] Ready to process. Click 'Execute Utility' to begin.`
    ]);
  };

  const runCosmosImporter = () => {
    if (!selectedFile) {
      alert('Please select a mock Excel file first!');
      return;
    }
    setIsRunning(true);
    setProgress(0);
    setStats(null);
    setConsoleLogs([`dotnet run --project CosmosDBBulkImporter.csproj -f ${selectedFile}`]);

    let currentProgress = 0;
    const logs = [
      'Initializing connection to Azure Cosmos DB context...',
      'Opening local file stream for Excel workbook parsing...',
      'Loaded workbook: Sheet1 contains 4,500 target rows.',
      'Analyzing container partitions for partitionKey: "/department"...',
      'Beginning bulk upload task execution (Parallelism degree: 8)...',
      'Executing partition insertion batch 1 of 18 (250 records)...',
      'Executing partition insertion batch 5 of 18 (1,250 records)...',
      'Executing partition insertion batch 10 of 18 (2,500 records)...',
      'Executing partition insertion batch 15 of 18 (3,750 records)...',
      'Validating data consistency on transaction commits...',
      'Cosmos DB bulk operation completed. Closing client session.',
    ];

    const timer = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      const logIndex = Math.floor((currentProgress / 100) * logs.length);
      if (logs[logIndex] && !consoleLogs.includes(logs[logIndex])) {
        addLog(logs[logIndex]);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setIsRunning(false);
        setStats({
          totalRows: 4500,
          inserted: 4491,
          failed: 9,
          elapsedTime: '1.45s'
        });
        addLog('Bulk data import finished successfully. Reduce human entry errors to 0%.');
      }
    }, 400);
  };

  const runAwsMigrator = () => {
    setIsRunning(true);
    setProgress(0);
    setStats(null);
    setConsoleLogs([
      'dotnet run --project S3SqsMigrationTool.csproj',
      'Initializing AWS Client SDK (S3, SQS config)...'
    ]);

    let currentProgress = 0;
    const logs = [
      'Connecting to S3 bucket: "production-backups"...',
      'Downloading sqlite_local_temp.db (35.2 MB) to memory stream...',
      'SQLite driver connected. Table scans: Users (1,200 rows), Roles (450 rows).',
      'Publishing migration job messages to AWS SQS queue: "db-migration-queue"...',
      'Queue messages successfully published. Spawning 4 background consumer tasks...',
      'Consumer task 1: Processing SQS messages... migrating batch to SQL Server...',
      'Consumer task 2: Processing SQS messages... migrating batch to SQL Server...',
      'Consumer task 3: Processing SQS messages... migrating batch to SQL Server...',
      'Writing destination records into SQL Server tables (BulkCopy transaction)...',
      'All queue messages consumed. Uploading final reports log to S3 bucket...',
      'AWS S3 backup verified. Transaction database locks released.'
    ];

    const timer = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      const logIndex = Math.floor((currentProgress / 100) * logs.length);
      if (logs[logIndex] && !consoleLogs.includes(logs[logIndex])) {
        addLog(logs[logIndex]);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setIsRunning(false);
        setStats({
          totalRows: 1650,
          inserted: 1650,
          failed: 0,
          elapsedTime: '2.10s'
        });
        addLog('SQLite database migrated to SQL Server completely. Manual SQS retries: 0.');
      }
    }, 400);
  };

  const handleSwitchTab = (tool: 'cosmos' | 'aws') => {
    if (isRunning) return;
    setActiveTool(tool);
    setSelectedFile(null);
    setStats(null);
    if (tool === 'cosmos') {
      setConsoleLogs([
        'dotnet run --project CosmosDBBulkImporter.csproj',
        'Ready. Select a mock Excel file below and click execute.'
      ]);
    } else {
      setConsoleLogs([
        'dotnet run --project S3SqsMigrationTool.csproj',
        'Ready. Click execute to begin database file migration.'
      ]);
    }
  };

  return (
    <section id="console-tools" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="gradient-text">Console Utility Simulator</h2>
          <p style={styles.sectionSubtitle}>
            Interactive shells replicating my production .NET Core CLI automation utilities for bulk database updates and AWS cloud storage migrations.
          </p>
        </div>

        {/* Console tab selectors */}
        <div style={styles.tabSelector}>
          <button
            onClick={() => handleSwitchTab('cosmos')}
            style={{
              ...styles.tabButton,
              color: activeTool === 'cosmos' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              backgroundColor: activeTool === 'cosmos' ? 'rgba(0, 242, 254, 0.06)' : 'transparent',
              borderColor: activeTool === 'cosmos' ? 'var(--accent-cyan)' : 'var(--border-color)',
            }}
          >
            <FileSpreadsheet size={16} />
            <span>Cosmos DB Excel Importer</span>
          </button>
          <button
            onClick={() => handleSwitchTab('aws')}
            style={{
              ...styles.tabButton,
              color: activeTool === 'aws' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              backgroundColor: activeTool === 'aws' ? 'rgba(0, 242, 254, 0.06)' : 'transparent',
              borderColor: activeTool === 'aws' ? 'var(--accent-cyan)' : 'var(--border-color)',
            }}
          >
            <Cloud size={16} />
            <span>AWS SQS/S3 DB Migrator</span>
          </button>
        </div>

        {/* Dashboard layout */}
        <div style={styles.dashboardGrid}>
          {/* Controls settings card */}
          <div className="glass-card" style={styles.controlCard}>
            <h3 style={styles.cardTitle}>CLI Controller</h3>
            <p style={styles.cardDescription}>
              {activeTool === 'cosmos' 
                ? 'Automates parsing Excel rows and updating Azure Cosmos DB container partition key entries.' 
                : 'Downloads SQLite backups from S3, broadcasts queues via AWS SQS, and writes rows to SQL Server.'
              }
            </p>

            <div style={styles.divider}></div>

            {/* Cosmos Importer Specific Options */}
            {activeTool === 'cosmos' && (
              <div style={styles.optionsArea}>
                <h4 style={styles.optionsLabel}>Select Mock Excel Sheet</h4>
                <div style={styles.filesGrid}>
                  {['patient_data_sheet.xlsx', 'employee_record_export.xlsx'].map((file) => (
                    <button
                      key={file}
                      onClick={() => handleSelectFile(file)}
                      style={{
                        ...styles.fileSelectBtn,
                        borderColor: selectedFile === file ? 'var(--accent-cyan)' : 'var(--border-color)',
                        backgroundColor: selectedFile === file ? 'rgba(0, 242, 254, 0.05)' : 'rgba(255,255,255,0.01)',
                      }}
                    >
                      <FileSpreadsheet size={14} style={{ color: 'var(--accent-green)' }} />
                      <span style={{ fontSize: '0.8rem', color: selectedFile === file ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {file}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AWS Specific Options */}
            {activeTool === 'aws' && (
              <div style={styles.optionsArea}>
                <h4 style={styles.optionsLabel}>AWS Integration Pipelines</h4>
                <div style={styles.awsFeatureList}>
                  <div style={styles.awsFeatureItem}>
                    <Cloud size={14} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontSize: '0.85rem' }}>Source: AWS S3 Bucket ("production-backups")</span>
                  </div>
                  <div style={styles.awsFeatureItem}>
                    <RefreshCw size={14} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontSize: '0.85rem' }}>Message Broker: AWS SQS Queue Jobs</span>
                  </div>
                  <div style={styles.awsFeatureItem}>
                    <Database size={14} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontSize: '0.85rem' }}>Target: SQL Server Instance (RDS)</span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              <button
                onClick={activeTool === 'cosmos' ? runCosmosImporter : runAwsMigrator}
                disabled={isRunning || (activeTool === 'cosmos' && !selectedFile)}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: (isRunning || (activeTool === 'cosmos' && !selectedFile)) ? 0.5 : 1,
                  cursor: (isRunning || (activeTool === 'cosmos' && !selectedFile)) ? 'not-allowed' : 'pointer'
                }}
              >
                <Play size={16} />
                <span>Execute Utility</span>
              </button>
            </div>
          </div>

          {/* CLI Terminal Shell */}
          <div style={styles.terminalContainer}>
            {/* Terminal title bar */}
            <div style={styles.terminalHeader}>
              <div style={styles.controls}>
                <div style={{ ...styles.dot, backgroundColor: 'var(--accent-red)' }}></div>
                <div style={{ ...styles.dot, backgroundColor: '#eab308' }}></div>
                <div style={{ ...styles.dot, backgroundColor: 'var(--accent-green)' }}></div>
              </div>
              <div style={styles.title}>
                <Terminal size={12} style={{ marginRight: '6px', color: 'var(--text-muted)' }} />
                <span>C:\Windows\system32\cmd.exe (dotnet-cli)</span>
              </div>
            </div>

            {/* Terminal logs body */}
            <div style={styles.terminalBody}>
              {consoleLogs.map((log, idx) => (
                <div key={idx} style={{ 
                  ...styles.logLine, 
                  color: log.startsWith('dotnet') ? 'var(--text-primary)' : 'var(--text-secondary)' 
                }}>
                  {log.startsWith('dotnet') ? `C:\\Users\\arpit\\Workspace> ${log}` : log}
                </div>
              ))}
              {isRunning && (
                <div style={styles.progressContainer}>
                  <div style={styles.progressBarWrapper}>
                    <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
                  </div>
                  <span style={styles.progressPct}>{progress}%</span>
                </div>
              )}
              
              {/* Output Stats Dashboard */}
              {stats && (
                <div style={styles.statsPanel}>
                  <div style={styles.statsHeader}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-green)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>Execution Summary</span>
                  </div>
                  <div style={styles.statsGrid}>
                    <div style={styles.statBox}>
                      <span style={styles.statLabel}>Rows Loaded</span>
                      <span style={styles.statValue}>{stats.totalRows}</span>
                    </div>
                    <div style={styles.statBox}>
                      <span style={styles.statLabel}>DB Updates</span>
                      <span style={styles.statValue}>{stats.inserted}</span>
                    </div>
                    <div style={styles.statBox}>
                      <span style={styles.statLabel}>Failures</span>
                      <span style={styles.statValue}>{stats.failed}</span>
                    </div>
                    <div style={styles.statBox}>
                      <span style={styles.statLabel}>Elapsed Time</span>
                      <span style={styles.statValue}>{stats.elapsedTime}</span>
                    </div>
                  </div>
                </div>
              )}
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
    gap: '1rem',
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
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.6fr',
    gap: '2rem',
    alignItems: 'stretch',
  },
  controlCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '4px',
  },
  cardDescription: {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    lineHeight: 1.4,
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.25rem 0',
  },
  optionsArea: {
    marginBottom: '1.5rem',
  },
  optionsLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  filesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  fileSelectBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0.65rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'var(--transition-fast)',
  },
  awsFeatureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  awsFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'var(--text-secondary)',
  },
  terminalContainer: {
    backgroundColor: '#0c0f16',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
  },
  terminalHeader: {
    backgroundColor: '#070a0e',
    borderBottom: '1px solid var(--border-color)',
    padding: '0.6rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
  },
  controls: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  title: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
  },
  terminalBody: {
    padding: '1.25rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    textAlign: 'left',
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minHeight: '300px',
  },
  logLine: {
    whiteSpace: 'pre-wrap',
    lineHeight: 1.4,
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
  },
  progressBarWrapper: {
    flex: 1,
    height: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'var(--accent-cyan)',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  progressPct: {
    fontSize: '0.75rem',
    color: 'var(--accent-cyan)',
  },
  statsPanel: {
    marginTop: '1.5rem',
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
    border: '1px solid rgba(16, 185, 129, 0.15)',
    borderRadius: '8px',
    padding: '1rem',
  },
  statsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.75rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    marginBottom: '2px',
  },
  statValue: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
};
