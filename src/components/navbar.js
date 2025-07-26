import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      setIsLoggedIn(!!token);
      setRole(userRole || '');
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setRole('');
    navigate('/'); // redirect to main login page
  };

  const navItems = [
    { name: 'Company', path: '/company', role: 'company' },
    { name: 'Vendor', path: '/vendor', role: 'vendor' }
  ];

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
        CabPortal
      </Link>

      <div className="flex items-center space-x-6">
        {isLoggedIn &&
          navItems
            .filter((item) => item.role === role)
            .map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium hover:text-blue-300 ${
                  location.pathname === item.path ? 'underline' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
      </div>

      <div className="flex items-center space-x-3">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-300">Logged in as: <strong>{role}</strong></span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium px-4 py-2 rounded-xl shadow-md bg-red-600 text-white hover:opacity-90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname === '/login' && (
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-xl shadow-md bg-blue-600 text-white hover:opacity-90 transition"
              >
                Register
              </Link>
            )}
            {location.pathname === '/register' && (
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
