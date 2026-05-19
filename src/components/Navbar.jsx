import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

        
        <Link to="/home" style={styles.brand}>
          <span style={styles.hexIcon}>⬡</span>
          <span style={styles.brandName}>TaskFlow</span>
        </Link>

        
        <div style={styles.links}>
          <NavLink
            to="/home"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.navLinkActive : {}),
            })}
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/add-task"
            style={({ isActive }) => ({
              ...styles.addBtn,
              ...(isActive ? styles.addBtnActive : {}),
            })}
          >
            + Add Task
          </NavLink>
        </div>

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
    maxWidth:       '100%',
    margin:         '0 auto',
    padding:        '0 32px',
    height:         '64px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            '16px',
  },
  brand: {
    display:        'flex',
    alignItems:     'center',
    gap:            '8px',
    textDecoration: 'none',
    flexShrink:      0,
  },
  hexIcon: {
    fontSize:   '22px',
    color:      '#6c63ff',
    lineHeight:  1,
  },
  brandName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize:   '20px',
    fontWeight:  800,
    color:      '#e8eaf0',
    letterSpacing: '-0.02em',
  },
  links: {
    display:    'flex',
    alignItems: 'center',
    gap:        '8px',
  },
  navLink: {
    color:          '#9aa3c0',
    textDecoration: 'none',
    fontSize:       '14px',
    fontWeight:      600,
    padding:        '8px 16px',
    borderRadius:   '8px',
    transition:     'all 0.15s',
  },
  navLinkActive: {
    color:      '#e8eaf0',
    background: '#1c2030',
  },
  addBtn: {
    background:     '#6c63ff',
    color:          '#fff',
    textDecoration: 'none',
    fontSize:       '14px',
    fontWeight:      600,
    padding:        '9px 18px',
    borderRadius:   '8px',
    transition:     'background 0.15s',
  },
  addBtnActive: {
    background: '#8b85ff',
  },
  right: {
    display:    'flex',
    alignItems: 'center',
    gap:        '12px',
    flexShrink:  0,
  },
  username: {
    fontSize:   '14px',
    color:      '#9aa3c0',
    fontWeight:  600,
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
  },
};

