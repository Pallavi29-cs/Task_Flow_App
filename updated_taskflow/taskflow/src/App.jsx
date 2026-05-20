/* App.jsx
   Root component — sets up Context providers, Router, and routes */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './routes/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';

/**
 * Layout wrapper shown after login:
 * - Sticky Navbar at top
 * - Page content in the middle
 * - Footer at bottom
 */
function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Public route — login page */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected routes — require login */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <HomePage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-task"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AddTaskPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Fallback — redirect unknown paths to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
