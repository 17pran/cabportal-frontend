// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CompanyDashboard from './pages/CompanyDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('userRole'));

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
        {/* If already logged in, redirect to dashboard from root/login/register */}
        <Route
          path="/"
          element={
            token ? (
              role === 'company' ? <Navigate to="/company" /> : <Navigate to="/vendor" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            token ? (
              role === 'company' ? <Navigate to="/company" /> : <Navigate to="/vendor" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            token ? (
              role === 'company' ? <Navigate to="/company" /> : <Navigate to="/vendor" />
            ) : (
              <Register />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/company"
          element={
            token && role === 'company' ? <CompanyDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/vendor"
          element={
            token && role === 'vendor' ? <VendorDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
