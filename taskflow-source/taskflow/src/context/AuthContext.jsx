/* context/AuthContext.jsx
   Stores the logged-in user globally using Context API */

import { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext(null);

/**
 * AuthProvider wraps the entire app and provides user state
 * to any component that calls useAuth()
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email }

  // Called on successful login
  const login = (userData) => setUser(userData);

  // Called on logout — clears user from context
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
