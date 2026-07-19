import React, { useState } from 'react';
import { Mail, Phone, Send, Terminal } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setApiResponse(null);

    // Simulate REST API POST delay
    setTimeout(() => {
      setIsSending(false);
      setApiResponse(
        JSON.stringify(
          {
            status: 201,
            statusText: 'Created',
            timestamp: new Date().toISOString(),
            data: {
              message: 'Thank you for reaching out, Arpit will contact you shortly!',
              payloadReceived: { name, email, messageLength: message.length }
            }
          },
          null,
          2
        )
      );
      setName('');
      setEmail('');
      setMessage('');
    }, 1800);
  };

  return (
    <section id="contact" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="gradient-text">Get In Touch</h2>
          <p style={styles.sectionSubtitle}>
            Have a question, project proposal, or just want to chat? Send me a message using the API simulator below or connect directly.
          </p>
        </div>

        <div style={styles.contactGrid}>
          {/* Left Column: Direct Links */}
          <div style={styles.infoCol}>
            <h3 style={styles.colTitle}>Connect Directly</h3>
            <p style={styles.colIntro}>
              Feel free to use standard communications channels or review my developer profiles.
            </p>

            <div style={styles.linksContainer}>
              <a href="mailto:arpit74057@gmail.com" style={styles.contactLink}>
                <div style={styles.iconCircle}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={styles.linkTitle}>Email</div>
                  <div style={styles.linkValue}>arpit74057@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918141056683" style={styles.contactLink}>
                <div style={styles.iconCircle}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={styles.linkTitle}>Phone</div>
                  <div style={styles.linkValue}>+91 8141056683</div>
                </div>
              </a>

              <a href="https://github.com/arpit8141" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                <div style={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
                <div>
                  <div style={styles.linkTitle}>GitHub</div>
                  <div style={styles.linkValue}>github.com/arpit8141</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/Arpit-Vaghela" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                <div style={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <div>
                  <div style={styles.linkTitle}>LinkedIn</div>
                  <div style={styles.linkValue}>linkedin.com/in/Arpit-Vaghela</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: JSON POST Form */}
          <div className="glass-card" style={styles.formCard}>
            <div style={styles.formHeader}>
              <div style={styles.apiEndpointBar}>
                <span style={styles.apiMethod}>POST</span>
                <span style={styles.apiUrl}>/api/v1/contact/send-message</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message Payload</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message details here..."
                  style={styles.textarea}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Send size={16} />
                <span>{isSending ? 'Sending HTTP POST Request...' : 'Send Request'}</span>
              </button>
            </form>

            {/* API response mock console */}
            {apiResponse && (
              <div style={styles.apiResponseConsole}>
                <div style={styles.consoleHeader}>
                  <Terminal size={12} style={{ color: 'var(--accent-cyan)', marginRight: '6px' }} />
                  <span>HTTP Response Status: 201 Created</span>
                </div>
                <pre style={styles.consolePre}>
                  <code>{apiResponse}</code>
                </pre>
              </div>
            )}
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
    marginBottom: '4.5rem',
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
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '3rem',
    alignItems: 'start',
  },
  infoCol: {
    textAlign: 'left',
  },
  colTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  colIntro: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    transition: 'var(--transition-smooth)',
  },
  iconCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 242, 254, 0.08)',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent-cyan)',
  },
  linkTitle: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },
  linkValue: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  formCard: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formHeader: {
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1rem',
  },
  apiEndpointBar: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
  },
  apiMethod: {
    color: 'var(--accent-green)',
    fontWeight: 'bold',
  },
  apiUrl: {
    color: 'var(--text-secondary)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    textAlign: 'left',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
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
    transition: 'var(--transition-smooth)',
  },
  textarea: {
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    padding: '0.75rem',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    resize: 'vertical',
  },
  apiResponseConsole: {
    marginTop: '1rem',
    backgroundColor: '#05070c',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    overflow: 'hidden',
    textAlign: 'left',
  },
  consoleHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottom: '1px solid var(--border-color)',
    padding: '0.5rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
  },
  consolePre: {
    margin: 0,
    padding: '1rem',
    overflowX: 'auto',
  },
};
