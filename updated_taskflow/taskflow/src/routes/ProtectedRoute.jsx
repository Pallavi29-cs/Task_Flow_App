/* routes/ProtectedRoute.jsx
   Guards routes that require login.
   If user is not in context, redirect to / (login page) */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Not logged in — send to login
    return <Navigate to="/" replace />;
  }

  return children;
}
