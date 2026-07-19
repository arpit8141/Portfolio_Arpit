import { useState, useEffect } from 'react';
import { TerminalHero } from './components/TerminalHero';
import { SyncSimulator } from './components/SyncSimulator';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Terminal, Menu, X } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['skills', 'experience', 'sync', 'architecture', 'contact'];
      const scrollPos = window.scrollY + 200;

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.appWrapper}>
      {/* Top Navbar */}
      <header style={styles.navbar}>
        <div className="container" style={styles.navbarContainer}>
          <div style={styles.logo} onClick={() => handleScrollToSection('home')}>
            <Terminal size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span>Arpit<span style={{ color: 'var(--accent-cyan)' }}>.Vaghela()</span></span>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={styles.desktopNav}>
            <button 
              onClick={() => handleScrollToSection('home')} 
              style={{...styles.navLink, color: activeSection === 'home' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}
            >
              Home
            </button>
            <button 
              onClick={() => handleScrollToSection('skills')} 
              style={{...styles.navLink, color: activeSection === 'skills' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}
            >
              Skills
            </button>
            <button 
              onClick={() => handleScrollToSection('experience')} 
              style={{...styles.navLink, color: activeSection === 'experience' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}
            >
              Experience
            </button>
            <button 
              onClick={() => handleScrollToSection('sync')} 
              style={{...styles.navLink, color: activeSection === 'sync' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}
            >
              Sync Simulator
            </button>
            <button 
              onClick={() => handleScrollToSection('architecture')} 
              style={{...styles.navLink, color: activeSection === 'architecture' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}
            >
              Architecture
            </button>
            <button 
              onClick={() => handleScrollToSection('contact')} 
              style={{...styles.navLink, color: activeSection === 'contact' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button style={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div style={styles.mobileNavDropdown}>
          {['home', 'skills', 'experience', 'sync', 'architecture', 'contact'].map((sec) => (
            <button
              key={sec}
              onClick={() => handleScrollToSection(sec)}
              style={{
                ...styles.mobileNavLink,
                color: activeSection === sec ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              }}
            >
              {sec.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Page Content Panels */}
      <main>
        <TerminalHero onScrollToSection={handleScrollToSection} />
        <Skills />
        <Experience />
        <SyncSimulator />
        <ArchitectureVisualizer />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div>
            <p style={{ fontWeight: 600 }}>Arpit Vaghela</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Full Stack Developer | ASP.NET Core & React TS Specialist
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              © {new Date().getFullYear()} Arpit Vaghela. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  appWrapper: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    backgroundColor: 'rgba(8, 11, 17, 0.75)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-color)',
  },
  navbarContainer: {
    height: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  desktopNav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    outline: 'none',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    outline: 'none',
  },
  mobileNavDropdown: {
    position: 'fixed',
    top: '64px',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 99,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  },
  mobileNavLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'pointer',
    outline: 'none',
  },
  footer: {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    padding: '2.5rem 0',
    marginTop: 'auto',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem',
    textAlign: 'left',
  },
};

// Insert media query check dynamically using inline document styles or styles sheet modifications
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @media (max-width: 768px) {
      header nav {
        display: none !important;
      }
      header button[style*="display: none"] {
        display: block !important;
      }
      #sync > div > div[style*="grid-template-columns"],
      #architecture > div > div[style*="grid-template-columns"],
      #contact > div > div[style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
      }
      #experience div[style*="gap: 2rem"] {
        gap: 1rem !important;
      }
      #experience div[style*="padding: 2rem"] {
        padding: 1.25rem !important;
      }
      #experience div[style*="flex-direction: column"] {
        align-items: flex-start !important;
      }
      #experience div[style*="align-items: flex-end"] {
        align-items: flex-start !important;
        margin-top: 0.5rem;
      }
      #contact form > div[style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

export default App;
