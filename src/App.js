// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import CompanyDashboard from './pages/CompanyDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('userRole'));

  // Watch for login/logout updates
  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/company"
          element={
            token && role === 'company' ? (
              <CompanyDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/vendor"
          element={
            token && role === 'vendor' ? (
              <VendorDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
