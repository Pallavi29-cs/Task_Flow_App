import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>

        {/* ── Brand / Logo ── */}
        <Link to="/home" style={styles.brand}>
          <Logo size={22} />
          <span style={styles.brandName}>TaskFlow</span>
        </Link>

        {/* ── Nav Links ── */}
        <div style={styles.links}>

          {/*
            HOME link:
            - Active  → purple filled button  (background #6c63ff, white text)
            - Inactive → plain text, no bg, no border
          */}
          <NavLink
            to="/home"
            end
            style={({ isActive }) =>
              isActive ? styles.navBtnActive : styles.navBtnInactive
            }
          >
            🏠 Home
          </NavLink>

          {/*
            ADD TASK link:
            - Active  → purple filled button  (background #6c63ff, white text)
            - Inactive → plain text, no bg, no border
          */}
          <NavLink
            to="/add-task"
            end
            style={({ isActive }) =>
              isActive ? styles.navBtnActive : styles.navBtnInactive
            }
          >
            + Add Task
          </NavLink>

        </div>

        {/* ── Right side: username + logout ── */}
        <div style={styles.right}>
          {user && (
            <span style={styles.username}>
              👤 {user.name}
            </span>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background:   '#151821',
    borderBottom: '1px solid #2a2f45',
    position:     'sticky',
    top:           0,
    zIndex:        100,
  },
  inner: {
    width:          '100%',
    padding:        '0 32px',
    height:         '56px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            '16px',
    boxSizing:      'border-box',
  },

  /* ── Brand ── */
  brand: {
    display:        'flex',
    alignItems:     'center',
    gap:            '8px',
    textDecoration: 'none',
    flexShrink:      0,
  },
  brandName: {
    fontFamily:    "'Poppins', sans-serif",
    fontSize:      '18px',
    fontWeight:     800,
    color:         '#e8eaf0',
    letterSpacing: '-0.02em',
  },

  /* ── Links group ── */
  links: {
    display:    'flex',
    alignItems: 'center',
    gap:        '4px',
  },

  /* ACTIVE state — purple filled, white text, rounded pill */
  navBtnActive: {
    background:     '#6c63ff',
    color:          '#ffffff',
    textDecoration: 'none',
    fontSize:       '14px',
    fontWeight:      600,
    padding:        '8px 18px',
    borderRadius:   '8px',
    transition:     'all 0.15s',
    fontFamily:     "'Poppins', sans-serif",
  },

  /* INACTIVE state — plain text, NO background, NO border */
  navBtnInactive: {
    background:     'transparent',
    color:          '#9aa3c0',
    textDecoration: 'none',
    fontSize:       '14px',
    fontWeight:      600,
    padding:        '8px 16px',
    borderRadius:   '8px',
    transition:     'all 0.15s',
    fontFamily:     "'Poppins', sans-serif",
  },

  /* ── Right section ── */
  right: {
    display:    'flex',
    alignItems: 'center',
    gap:        '12px',
    flexShrink:  0,
  },
  username: {
    fontSize:  '14px',
    color:     '#9aa3c0',
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
  },
  logoutBtn: {
    background:   'transparent',
    border:       '1px solid #363c5a',
    color:        '#9aa3c0',
    padding:      '7px 16px',
    borderRadius: '8px',
    fontSize:     '14px',
    fontWeight:    600,
    cursor:       'pointer',
    transition:   'all 0.15s',
    fontFamily:   "'Poppins', sans-serif",
  },
};
