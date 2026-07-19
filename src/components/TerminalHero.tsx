import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Circle, Sparkles } from 'lucide-react';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

interface TerminalHeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export const TerminalHero: React.FC<TerminalHeroProps> = ({ onScrollToSection }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'systeminfo',
      output: (
        <div style={{ color: 'var(--accent-cyan)' }}>
          <p>--------------------------------------------------</p>
          <p><strong>ARPIT VAGHELA - FULL STACK DEVELOPER PORTFOLIO v1.0.0</strong></p>
          <p>--------------------------------------------------</p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Welcome! I build offline-first React applications, real-time microservices in .NET, and scalable cloud solutions.
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
            Type a command or click a chip below to explore my profile.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdText: string) => {
    const trimmedCmd = cmdText.trim().toLowerCase();
    let response: React.ReactNode;

    if (!trimmedCmd) return;

    switch (trimmedCmd) {
      case 'help':
        response = (
          <div className="terminal-help">
            <p style={{ color: 'var(--accent-blue)', marginBottom: '4px' }}>Available Commands:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px' }}>
              <div><span style={{ color: 'var(--accent-cyan)' }}>about</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>Show short summary & biography</div>
              <div><span style={{ color: 'var(--accent-cyan)' }}>skills</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>List key languages & tech stack</div>
              <div><span style={{ color: 'var(--accent-cyan)' }}>experience</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>Print professional work history</div>
              <div><span style={{ color: 'var(--accent-cyan)' }}>sync</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>Trigger offline-first simulation tool</div>
              <div><span style={{ color: 'var(--accent-cyan)' }}>contact</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>Get social & direct contact details</div>
              <div><span style={{ color: 'var(--accent-cyan)' }}>clear</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>Clear the terminal history</div>
            </div>
          </div>
        );
        break;
      case 'about':
        response = (
          <div>
            <p><strong style={{ color: 'var(--accent-cyan)' }}>Bio:</strong> Full Stack Developer with a strong focus on Clean Architecture, .NET Microservices, and offline-first React applications.</p>
            <p style={{ marginTop: '4px' }}><strong style={{ color: 'var(--accent-cyan)' }}>Location:</strong> Ahmedabad, Gujarat, India</p>
            <p style={{ marginTop: '4px' }}><strong style={{ color: 'var(--accent-cyan)' }}>Education:</strong> MCA (Masters in Computer Applications - 6.6 CGPA)</p>
          </div>
        );
        break;
      case 'skills':
        response = (
          <div>
            <p style={{ color: 'var(--accent-blue)' }}>Technical Inventory:</p>
            <p style={{ marginLeft: '8px' }}>• <span style={{ color: 'var(--text-primary)' }}>Languages:</span> C#, SQL, JavaScript, TypeScript, Python</p>
            <p style={{ marginLeft: '8px' }}>• <span style={{ color: 'var(--text-primary)' }}>Backend:</span> .NET Core Web API, Microservices, EF Core, ADO.NET, SignalR</p>
            <p style={{ marginLeft: '8px' }}>• <span style={{ color: 'var(--text-primary)' }}>Frontend:</span> React, Redux, IndexedDB, MobX, PrimeReact, MaterialUI</p>
            <p style={{ marginLeft: '8px' }}>• <span style={{ color: 'var(--text-primary)' }}>Databases & Cloud:</span> SQL Server, Cosmos DB, AWS SQS, AWS S3</p>
            <p style={{ marginTop: '6px', color: 'var(--text-muted)' }}>Scrolling you to the interactive Skills section...</p>
          </div>
        );
        setTimeout(() => onScrollToSection('skills'), 1500);
        break;
      case 'experience':
        response = (
          <div>
            <p style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>Career Timeline:</p>
            <p style={{ marginTop: '4px' }}><strong>1. AaNeel Technology Solutions (Feb 2026 - Present)</strong></p>
            <p style={{ marginLeft: '8px', color: 'var(--text-secondary)' }}>Fullstack Software Developer - Built offline-first apps & Cosmos DB utilities.</p>
            <p style={{ marginTop: '4px' }}><strong>2. Binary Republik (Jan 2023 - Jan 2026)</strong></p>
            <p style={{ marginLeft: '8px', color: 'var(--text-secondary)' }}>Fullstack Software Developer - Engineered HRMS & healthcare apps, SQL optimization (+97%).</p>
            <p style={{ marginTop: '6px', color: 'var(--text-muted)' }}>Scrolling you to the Experience timeline...</p>
          </div>
        );
        setTimeout(() => onScrollToSection('experience'), 1500);
        break;
      case 'sync':
        response = (
          <div>
            <p style={{ color: 'var(--accent-green)' }}>[SignalR] Handshake successful.</p>
            <p style={{ color: 'var(--accent-cyan)' }}>[Client] Local storage (IndexedDB) initialized.</p>
            <p style={{ color: 'var(--text-secondary)' }}>[SyncService] Verification completed. 0 outstanding conflicts detected.</p>
            <p style={{ marginTop: '6px', color: 'var(--text-muted)' }}>Scrolling to offline-first dashboard simulator...</p>
          </div>
        );
        setTimeout(() => onScrollToSection('sync'), 1200);
        break;
      case 'contact':
        response = (
          <div>
            <p><strong>Email:</strong> arpit74057@gmail.com</p>
            <p><strong>Phone:</strong> +91 8141056683</p>
            <p><strong>GitHub:</strong> github.com/arpit8141</p>
            <p><strong>LinkedIn:</strong> linkedin.com/in/Arpit-Vaghela</p>
            <p style={{ marginTop: '6px', color: 'var(--text-muted)' }}>Scrolling to contact form...</p>
          </div>
        );
        setTimeout(() => onScrollToSection('contact'), 1500);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = (
          <span style={{ color: 'var(--accent-red)' }}>
            Command '{trimmedCmd}' not found. Type 'help' to see list of valid commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const handleChipClick = (cmd: string) => {
    setInput(cmd);
    handleCommand(cmd);
  };

  return (
    <section className="hero-section" style={styles.heroSection}>
      <div className="bg-grid"></div>
      <div className="container" style={styles.container}>
        <div style={styles.headerArea}>
          <div style={styles.badge}>
            <Sparkles size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>Interactive Portfolio</span>
          </div>
          <h1 style={styles.mainTitle}>
            Hi, I'm <span className="gradient-text" style={styles.nameHighlight}>Arpit Vaghela</span>
          </h1>
          <h2 style={styles.subTitle}>
            Full Stack Developer specializing in .NET Core & React TS
          </h2>
          <p style={styles.introParagraph}>
            I construct high-reliability, offline-first web apps, automate complex data pipelines, and design robust databases following Clean Architecture.
          </p>
        </div>

        {/* Console Box */}
        <div className="glass-card" style={styles.terminalWindow} onClick={focusInput}>
          {/* Terminal Title Bar */}
          <div style={styles.terminalHeader}>
            <div style={styles.windowControls}>
              <Circle size={12} fill="var(--accent-red)" stroke="none" style={{ opacity: 0.8 }} />
              <Circle size={12} fill="#eab308" stroke="none" style={{ opacity: 0.8 }} />
              <Circle size={12} fill="var(--accent-green)" stroke="none" style={{ opacity: 0.8 }} />
            </div>
            <div style={styles.terminalTitle}>
              <Terminal size={14} style={{ marginRight: '6px', color: 'var(--text-muted)' }} />
              <span>arpit@vaghela-dev-shell: ~</span>
            </div>
            <div style={{ width: '50px' }}></div>
          </div>

          {/* Terminal Console Body */}
          <div style={styles.terminalBody}>
            {history.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={styles.terminalPromptLine}>
                  <span style={{ color: 'var(--accent-green)' }}>arpit-portfolio$</span>
                  <span style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>{item.command}</span>
                </div>
                <div style={styles.terminalOutputLine}>{item.output}</div>
              </div>
            ))}
            
            {/* Input Line */}
            <div style={styles.terminalPromptLine}>
              <span style={{ color: 'var(--accent-green)' }}>arpit-portfolio$</span>
              <div style={styles.inputContainer}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={styles.terminalInput}
                  placeholder="type a command (e.g. 'help')..."
                  autoComplete="off"
                  autoFocus
                />
                <button onClick={() => handleCommand(input)} style={styles.inputSubmitBtn}>
                  <CornerDownLeft size={14} />
                </button>
              </div>
            </div>
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Command Chips */}
        <div style={styles.chipsContainer}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quick Actions:</span>
          {['help', 'about', 'skills', 'experience', 'sync', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleChipClick(cmd)}
              className="btn-secondary"
              style={styles.chipButton}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  heroSection: {
    position: 'relative',
    padding: '6rem 0 4rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '85vh',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
  },
  headerArea: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    maxWidth: '800px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(0, 242, 254, 0.08)',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    padding: '0.4rem 0.9rem',
    borderRadius: '999px',
    color: 'var(--accent-cyan)',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  mainTitle: {
    fontSize: '3.5rem',
    lineHeight: 1.1,
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  nameHighlight: {
    fontWeight: 800,
  },
  subTitle: {
    fontSize: '1.5rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    marginBottom: '1.2rem',
  },
  introParagraph: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
    lineHeight: 1.6,
    maxWidth: '650px',
    margin: '0 auto',
  },
  terminalWindow: {
    width: '100%',
    maxWidth: '750px',
    height: '380px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'text',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  terminalHeader: {
    backgroundColor: 'rgba(11, 15, 25, 0.9)',
    borderBottom: '1px solid var(--border-color)',
    padding: '0.75rem 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    userSelect: 'none',
  },
  windowControls: {
    display: 'flex',
    gap: '6px',
  },
  terminalTitle: {
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
  },
  terminalBody: {
    flex: 1,
    padding: '1.5rem',
    backgroundColor: 'rgba(10, 13, 20, 0.75)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    overflowY: 'auto',
    textAlign: 'left',
    color: 'var(--text-primary)',
  },
  terminalPromptLine: {
    display: 'flex',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginLeft: '8px',
  },
  terminalInput: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    width: '100%',
    outline: 'none',
  },
  inputSubmitBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  terminalOutputLine: {
    marginTop: '6px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem',
    maxWidth: '750px',
  },
  chipButton: {
    padding: '0.4rem 0.8rem',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-mono)',
    borderRadius: '6px',
  },
};
