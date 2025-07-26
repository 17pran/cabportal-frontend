import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const syncAuth = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setRole(userRole || '');
  };

  useEffect(() => {
    syncAuth();
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setRole('');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
        CabPortal
      </Link>

      <div className="flex items-center space-x-6">
        {isLoggedIn && role === 'company' && (
          <Link
            to="/company"
            className={`text-sm font-medium hover:text-blue-300 ${
              location.pathname === '/company' ? 'underline' : ''
            }`}
          >
            Company
          </Link>
        )}
        {isLoggedIn && role === 'vendor' && (
          <Link
            to="/vendor"
            className={`text-sm font-medium hover:text-blue-300 ${
              location.pathname === '/vendor' ? 'underline' : ''
            }`}
          >
            Vendor
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-300">
              Logged in as: <strong>{role}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium px-4 py-2 rounded-xl shadow-md bg-red-600 text-white hover:opacity-90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== '/register' && (
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-xl shadow-md bg-blue-600 text-white hover:opacity-90 transition"
              >
                Register
              </Link>
            )}
            {location.pathname !== '/login' && (
              <Link
                to="/login"
                className="text-sm font-medium px-4 py-2 rounded-xl shadow-md bg-white text-blue-700 hover:opacity-90 transition"
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
