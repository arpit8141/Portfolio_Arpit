import React, { useState } from 'react';
import { Wifi, WifiOff, Database, Server, RefreshCw, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

interface LocalRecord {
  id: string;
  name: string;
  role: string;
  status: 'pending' | 'syncing' | 'synced' | 'conflict';
  timestamp: string;
}

export const SyncSimulator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [localDB, setLocalDB] = useState<LocalRecord[]>([
    { id: '1', name: 'John Doe', role: 'Developer', status: 'synced', timestamp: '10:14:02' },
    { id: '2', name: 'Sarah Connor', role: 'QA Lead', status: 'synced', timestamp: '10:15:30' }
  ]);
  const [serverDB, setServerDB] = useState<LocalRecord[]>([
    { id: '1', name: 'John Doe', role: 'Developer', status: 'synced', timestamp: '10:14:02' },
    { id: '2', name: 'Sarah Connor', role: 'QA Lead', status: 'synced', timestamp: '10:15:30' }
  ]);
  
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Developer');
  const [isSyncing, setIsSyncing] = useState(false);
  const [simulateConflict, setSimulateConflict] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([
    '[System] Synchronization module initialized.',
    '[SignalR] Connection established with .NET Web API.'
  ]);

  const addLog = (msg: string) => {
    setSyncLogs((prev) => [...prev.slice(-6), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (nextState) {
      addLog('SignalR connection restored. Sync engine alerted.');
    } else {
      addLog('Network offline. Switching to IndexedDB offline storage mode.');
    }
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newRecord: LocalRecord = {
      id: Math.random().toString(36).substring(2, 7),
      name: newName,
      role: newRole,
      status: isOnline ? 'synced' : 'pending',
      timestamp: new Date().toLocaleTimeString()
    };

    setLocalDB((prev) => [...prev, newRecord]);
    
    if (isOnline) {
      setServerDB((prev) => [...prev, newRecord]);
      addLog(`[API POST] Saved record for ${newName} directly to SQL Server.`);
    } else {
      addLog(`[IndexedDB] Offline: Saved ${newName} to local queue.`);
    }
    
    setNewName('');
  };

  const handleSync = () => {
    const pendingItems = localDB.filter((item) => item.status === 'pending');
    if (pendingItems.length === 0) {
      addLog('No outstanding client updates found. Sync is up-to-date.');
      return;
    }

    setIsSyncing(true);
    addLog(`[SyncEngine] Starting bidirectional sync of ${pendingItems.length} records.`);
    
    // Simulate multi-stage synchronization
    setTimeout(() => {
      addLog('[SignalR] Channel negotiating connection parameters...');
    }, 600);

    setTimeout(() => {
      if (simulateConflict) {
        addLog('[SyncEngine] Conflict detected on record! Server value has changed.');
        setLocalDB((prev) =>
          prev.map((item) =>
            item.status === 'pending' ? { ...item, status: 'conflict' } : item
          )
        );
        addLog('[ConflictService] Resolving conflict: Applying Clean Architecture validation rule (Client Wins).');
      } else {
        addLog('[SyncEngine] Validating local payload signatures...');
      }
    }, 1500);

    setTimeout(() => {
      // Sync items to server
      setServerDB((prev) => {
        const updated = [...prev];
        localDB.forEach((localItem) => {
          if (localItem.status === 'pending' || localItem.status === 'conflict') {
            const exists = updated.find(s => s.id === localItem.id);
            if (!exists) {
              updated.push({ ...localItem, status: 'synced' });
            }
          }
        });
        return updated;
      });

      // Update local storage status
      setLocalDB((prev) =>
        prev.map((item) =>
          item.status === 'pending' || item.status === 'conflict'
            ? { ...item, status: 'synced' }
            : item
        )
      );

      setIsSyncing(false);
      addLog('[SyncEngine] Sync completed. localDB and SQL Server are in sync.');
      if (simulateConflict) {
        addLog('[SignalR] Broadcast update: Conflict resolved and synchronized across all clients.');
      } else {
        addLog('[SignalR] Real-time updates pushed. Database transactions closed.');
      }
    }, 3000);
  };

  return (
    <section id="sync" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="gradient-text">Offline-First Sync Simulator</h2>
          <p style={styles.sectionSubtitle}>
            An interactive sandbox demonstrating my experience building offline-first systems (React, Redux, IndexedDB) synchronizing with .NET Web APIs via SignalR.
          </p>
        </div>

        <div style={styles.dashboardGrid}>
          {/* Controls Card */}
          <div className="glass-card" style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Controller Settings</h3>
              <div 
                onClick={handleToggleOnline} 
                style={{
                  ...styles.statusBadge, 
                  backgroundColor: isOnline ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  borderColor: isOnline ? 'var(--accent-green)' : 'var(--accent-red)',
                  color: isOnline ? 'var(--accent-green)' : 'var(--accent-red)',
                }}
              >
                {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                <span>{isOnline ? 'Network Online' : 'Network Offline'}</span>
              </div>
            </div>

            <form onSubmit={handleCreateRecord} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  placeholder="e.g. Walter White" 
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title</label>
                <select 
                  value={newRole} 
                  onChange={(e) => setNewRole(e.target.value)} 
                  style={styles.select}
                >
                  <option value="Developer">Software Developer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="System Architect">System Architect</option>
                  <option value="Database Administrator">Database Administrator</option>
                </select>
              </div>
              
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={16} />
                <span>Create HR Record</span>
              </button>
            </form>

            <div style={styles.divider}></div>

            <div style={styles.conflictControl}>
              <div style={styles.checkboxWrapper}>
                <input 
                  type="checkbox" 
                  id="conflict" 
                  checked={simulateConflict}
                  onChange={(e) => setSimulateConflict(e.target.checked)}
                  style={styles.checkbox}
                />
                <label htmlFor="conflict" style={styles.checkboxLabel}>
                  Simulate Merge Conflict
                </label>
              </div>
              <p style={styles.helperText}>
                Injects conflicting server revisions to trigger automated Clean Architecture merge schemas on synchronization.
              </p>
            </div>

            <button 
              onClick={handleSync} 
              disabled={isSyncing || !isOnline} 
              className="btn-secondary" 
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                borderColor: isOnline ? 'var(--accent-cyan)' : 'var(--border-color)',
                opacity: !isOnline ? 0.5 : 1,
                cursor: !isOnline ? 'not-allowed' : 'pointer'
              }}
            >
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
              <span>{isSyncing ? 'Synchronizing...' : 'Trigger Sync'}</span>
            </button>
          </div>

          {/* Database Columns */}
          <div style={styles.databasesContainer}>
            {/* Local Database */}
            <div className="glass-card" style={styles.dbCard}>
              <div style={styles.dbCardHeader}>
                <Database size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Client Storage (IndexedDB)</span>
              </div>
              <div style={styles.recordsList}>
                {localDB.map((item) => (
                  <div key={item.id} style={styles.recordItem}>
                    <div>
                      <div style={styles.recordName}>{item.name}</div>
                      <div style={styles.recordRole}>{item.role}</div>
                    </div>
                    <div>
                      <span 
                        style={{
                          ...styles.recordStatusBadge,
                          backgroundColor: 
                            item.status === 'synced' ? 'rgba(16, 185, 129, 0.1)' : 
                            item.status === 'pending' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: 
                            item.status === 'synced' ? 'var(--accent-green)' : 
                            item.status === 'pending' ? '#eab308' : 'var(--accent-red)',
                          border: `1px solid ${
                            item.status === 'synced' ? 'var(--accent-green)' : 
                            item.status === 'pending' ? '#eab308' : 'var(--accent-red)'
                          }`
                        }}
                      >
                        {item.status === 'synced' && <CheckCircle2 size={10} style={{ marginRight: '4px' }} />}
                        {item.status === 'pending' && <RefreshCw size={10} style={{ marginRight: '4px' }} />}
                        {item.status === 'conflict' && <AlertTriangle size={10} style={{ marginRight: '4px' }} />}
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Server Database */}
            <div className="glass-card" style={styles.dbCard}>
              <div style={styles.dbCardHeader}>
                <Server size={16} style={{ color: 'var(--accent-purple)' }} />
                <span>SQL Server (Remote Host)</span>
              </div>
              <div style={styles.recordsList}>
                {serverDB.map((item) => (
                  <div key={item.id} style={styles.recordItem}>
                    <div>
                      <div style={styles.recordName}>{item.name}</div>
                      <div style={styles.recordRole}>{item.role}</div>
                    </div>
                    <div>
                      <span style={{...styles.recordStatusBadge, backgroundColor: 'rgba(127, 0, 255, 0.1)', color: '#c084fc', border: '1px solid #7f00ff'}}>
                        <CheckCircle2 size={10} style={{ marginRight: '4px' }} />
                        saved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sync Logs Console */}
        <div style={styles.logsConsole}>
          <div style={styles.logsHeader}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              SyncEngine Event Stream Log
            </span>
          </div>
          <div style={styles.logsBody}>
            {syncLogs.map((log, index) => (
              <div key={index} style={styles.logLine}>{log}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dynamic spins CSS animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '2rem',
    marginBottom: '2rem',
  },
  dashboardCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.35rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: 600,
    border: '1px solid transparent',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'var(--transition-fast)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  input: {
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    padding: '0.75rem',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '0.9rem',
    transition: 'var(--transition-fast)',
  },
  select: {
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    padding: '0.75rem',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '0.9rem',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.5rem 0',
  },
  conflictControl: {
    marginBottom: '1.5rem',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  checkbox: {
    width: '15px',
    height: '15px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  helperText: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  },
  databasesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  dbCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  dbCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    fontSize: '0.9rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.75rem',
    marginBottom: '1rem',
  },
  recordsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxHeight: '180px',
    overflowY: 'auto',
  },
  recordItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--bg-secondary)',
    padding: '0.65rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
  },
  recordName: {
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  recordRole: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  recordStatusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'lowercase',
    fontWeight: 600,
  },
  logsConsole: {
    marginTop: '2rem',
    backgroundColor: '#05070c',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  logsHeader: {
    backgroundColor: 'rgba(15, 20, 34, 0.5)',
    borderBottom: '1px solid var(--border-color)',
    padding: '0.5rem 1rem',
  },
  logsBody: {
    padding: '1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minHeight: '120px',
    justifyContent: 'flex-end',
  },
  logLine: {
    color: 'var(--accent-cyan)',
    textAlign: 'left',
  },
};

