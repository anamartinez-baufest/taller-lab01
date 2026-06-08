import { useNavigate } from 'react-router-dom';
import { logout, getAccessToken } from '../services/auth';

function parseJwtPayload(token) {
  try {
    const base64 = token.split('.')[1];
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function Welcome() {
  const navigate = useNavigate();
  const token = getAccessToken();
  const payload = token ? parseJwtPayload(token) : null;
  const username = payload?.sub ?? 'User';

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.bgBlob1} />
      <div style={styles.bgBlob2} />
      <div style={styles.bgBlob3} />

      <div style={styles.layout}>
        {/* Top nav bar */}
        <header style={styles.header}>
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

          <div style={styles.navRight}>
            <div style={styles.avatarBadge}>
              <div style={styles.avatar}>
                {username.charAt(0).toUpperCase()}
              </div>
              <span style={styles.avatarLabel}>{username}</span>
            </div>
            <button onClick={handleLogout} style={styles.btnLogout}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v7A1.5 1.5 0 0 0 2.5 12H5" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round"/>
                <path d="M9 9.5 12.5 7 9 4.5" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 7H5" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
              Sign out
            </button>
          </div>
        </header>

        {/* Hero section */}
        <section style={styles.hero}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            Session active
          </div>
          <h1 style={styles.heroTitle}>
            Welcome,&nbsp;
            <span style={styles.heroHighlight}>{username}</span>
          </h1>
          <p style={styles.heroSubtitle}>
            You are successfully authenticated. Your session is secured with a JWT access token.
          </p>
        </section>

        {/* Stats cards row */}
        <div style={styles.cardsRow}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="4.5" width="15" height="11.25" rx="1.5" stroke="#111827" strokeWidth="1.25"/>
                <path d="M5.25 4.5V3.375A1.125 1.125 0 0 1 6.375 2.25h5.25A1.125 1.125 0 0 1 12.75 3.375V4.5" stroke="#111827" strokeWidth="1.25" strokeLinecap="round"/>
                <path d="M1.5 9h15" stroke="#111827" strokeWidth="1.25"/>
              </svg>
            </div>
            <div>
              <div style={styles.statLabel}>Role</div>
              <div style={styles.statValue}>Administrator</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#111827" strokeWidth="1.25"/>
                <path d="M9 5.25v4.5l2.625 1.5" stroke="#111827" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={styles.statLabel}>Token expires in</div>
              <div style={styles.statValue}>300 seconds</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5 11.25 6.75H16.5l-4.125 3 1.5 5.25L9 12l-4.875 3 1.5-5.25L1.5 6.75h5.25L9 1.5Z" stroke="#111827" strokeWidth="1.25" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={styles.statLabel}>Status</div>
              <div style={styles.statValue}>Authenticated</div>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div style={styles.infoPanel}>
          <div style={styles.infoPanelHeader}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#6B7280" strokeWidth="1.25"/>
              <path d="M7 6v4" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round"/>
              <circle cx="7" cy="4" r="0.75" fill="#6B7280"/>
            </svg>
            <span style={styles.infoPanelTitle}>Session details</span>
          </div>
          <div style={styles.infoList}>
            <div style={styles.infoRow}>
              <span style={styles.infoKey}>User</span>
              <span style={styles.infoVal}>{username}</span>
            </div>
            <div style={styles.infoDivider} />
            <div style={styles.infoRow}>
              <span style={styles.infoKey}>Auth method</span>
              <span style={styles.infoVal}>JWT Bearer</span>
            </div>
            <div style={styles.infoDivider} />
            <div style={styles.infoRow}>
              <span style={styles.infoKey}>Storage</span>
              <span style={styles.infoVal}>sessionStorage</span>
            </div>
            <div style={styles.infoDivider} />
            <div style={styles.infoRow}>
              <span style={styles.infoKey}>Backend</span>
              <span style={styles.infoVal}>FastAPI · JWT Auth API</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#FFFFFF',
    backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(224,231,255,0.3) 0%, transparent 55%), radial-gradient(circle at 90% 90%, rgba(255,237,213,0.25) 0%, transparent 55%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgBlob1: {
    position: 'absolute',
    top: '-120px',
    right: '-60px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(224,231,255,0.4) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgBlob2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,237,213,0.4) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgBlob3: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(100,150,255,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  layout: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '860px',
    margin: '0 auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    minHeight: '100vh',
  },
  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '0.8px solid rgba(255,255,255,0.9)',
    borderRadius: '16px',
    padding: '12px 20px',
    boxShadow: 'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.04) 0px 8px 30px 0px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '9999px',
    background: '#E0E7FF',
    color: '#111827',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    letterSpacing: '0.35px',
  },
  btnLogout: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6B7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0px',
    borderRadius: '0px',
    transition: 'color 150ms ease',
    letterSpacing: '0.35px',
  },
  /* Hero */
  hero: {
    padding: '48px 0 16px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#F0FDF4',
    border: '0.8px solid #BBF7D0',
    borderRadius: '9999px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#16A34A',
    letterSpacing: '0.35px',
    marginBottom: '16px',
  },
  heroBadgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#22C55E',
    display: 'inline-block',
  },
  heroTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '40px',
    fontWeight: 500,
    color: '#111827',
    lineHeight: '48px',
    letterSpacing: '-0.025em',
    marginBottom: '12px',
  },
  heroHighlight: {
    color: '#111827',
  },
  heroSubtitle: {
    fontSize: '14px',
    fontWeight: 300,
    color: '#6B7280',
    lineHeight: '22.75px',
    maxWidth: '480px',
  },
  /* Stat cards */
  cardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: '0.8px solid rgba(255,255,255,0.9)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: 'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.04) 0px 8px 30px 0px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statLabel: {
    fontSize: '12px',
    fontWeight: 300,
    color: '#6B7280',
    lineHeight: '18px',
    marginBottom: '2px',
  },
  statValue: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    letterSpacing: '0.35px',
  },
  /* Info panel */
  infoPanel: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: '0.8px solid rgba(255,255,255,0.9)',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: 'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.04) 0px 8px 30px 0px',
  },
  infoPanelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '16px',
  },
  infoPanelTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#6B7280',
    letterSpacing: '0.35px',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  infoDivider: {
    height: '0.8px',
    background: '#E5E7EB',
  },
  infoKey: {
    fontSize: '14px',
    fontWeight: 300,
    color: '#6B7280',
  },
  infoVal: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    letterSpacing: '0.35px',
  },
};
