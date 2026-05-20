/* components/Navbar.jsx
   Top navigation bar — visible on all protected pages
   Uses useLocation to correctly highlight ONLY the active route */

import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Exact match — only highlight if the path matches exactly
  const isHome    = location.pathname === '/home';
  const isAddTask = location.pathname === '/add-task';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo / App name */}
        <div className="navbar-brand">
          <span className="navbar-icon">⬡</span>
          <span className="navbar-title">TaskFlow</span>
        </div>

        {/* Navigation links — exact active class manually applied */}
        <div className="navbar-links">
          <NavLink
            to="/home"
            end
            className={`nav-link ${isHome ? 'active' : ''}`}
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/add-task"
            end
            className={`nav-link ${isAddTask ? 'active' : ''}`}
          >
            + Add Task
          </NavLink>
        </div>

        {/* User info + logout */}
        <div className="navbar-user">
          {user && (
            <span className="navbar-username">
              <span className="user-icon">👤</span>
              {user.name}
            </span>
          )}
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
