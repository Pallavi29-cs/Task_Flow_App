import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Login    from '../pages/Login';
import Home     from '../pages/Home';
import AddTask  from '../pages/AddTask';
import EditTask from '../pages/EditTask';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}


export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {}
      {user && <Navbar />}

      <Routes>
        {}
        <Route path="/" element={<Login />} />

        {}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

        {}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {}
      {user && <Footer />}
    </>
  );
}
