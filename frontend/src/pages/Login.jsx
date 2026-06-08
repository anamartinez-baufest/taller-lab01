import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/welcome', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.bgBlob1} />
      <div style={styles.bgBlob2} />

      {/* Card shell (gradient border technique) */}
      <div style={styles.cardShell}>
        <div style={styles.card}>
          {/* Logo / brand */}
          <div style={styles.brand}>
            <div style={styles.logoMark}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#111827" />
                <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#111827" opacity="0.4" />
                <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#111827" opacity="0.4" />
                <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#111827" />
              </svg>
            </div>
            <span style={styles.brandName}>FlowOps</span>
          </div>

          <h1 style={styles.title}>Welcome back</h1>
          <p style={styles.subtitle}>Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#6496FF')}
                onBlur={(e) => (e.target.style.borderColor = '#E0E7FF')}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#6496FF')}
                onBlur={(e) => (e.target.style.borderColor = '#E0E7FF')}
              />
            </div>

            {error && (
              <div style={styles.errorBadge} role="alert">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.5" />
                  <path d="M7 4v3.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="7" cy="10" r="0.75" fill="#DC2626" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.btnPrimary,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF',
    backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(224,231,255,0.35) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,237,213,0.3) 0%, transparent 60%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px',
  },
  bgBlob1: {
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(224,231,255,0.5) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgBlob2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,237,213,0.5) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  /* Gradient border shell */
  cardShell: {
    position: 'relative',
    padding: '1px',
    borderRadius: '33px',
    background: 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.04) 100%)',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '32px',
    padding: '40px 36px',
    border: '0.8px solid rgba(255,255,255,0.9)',
    boxShadow: 'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '28px',
  },
  logoMark: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#111827',
    letterSpacing: '0.35px',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '24px',
    fontWeight: 500,
    color: '#111827',
    lineHeight: '32px',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 300,
    color: '#6B7280',
    lineHeight: '22.75px',
    marginBottom: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    lineHeight: '20px',
    letterSpacing: '0.35px',
  },
  input: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 300,
    color: '#111827',
    background: '#FFFFFF',
    border: '0.8px solid #E0E7FF',
    borderRadius: '8px',
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    lineHeight: '22.75px',
    width: '100%',
  },
  errorBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#FEF2F2',
    border: '0.8px solid #FECACA',
    color: '#DC2626',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  btnPrimary: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.35px',
    color: '#FFFFFF',
    background: '#111827',
    border: 'none',
    borderRadius: '9999px',
    padding: '12px',
    width: '100%',
    transition: 'opacity 150ms ease, transform 150ms ease',
    marginTop: '4px',
  },
};
