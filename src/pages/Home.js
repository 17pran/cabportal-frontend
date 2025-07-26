import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveAuthData } from './authUtils';
import CompanyDashboard from './CompanyDashboard';
import VendorDashboard from './VendorDashboard';

function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'company' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });
      saveAuthData(res.data);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      if (err.response?.data?.message === 'User not found') {
        setShowRegister(true);
      } else {
        setError(err.response?.data?.message || 'Login failed');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, form);
      saveAuthData(res.data);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          {showRegister ? 'Register' : 'Login'}
        </h2>

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <form onSubmit={showRegister ? handleRegister : handleLogin} className="space-y-4">
          {showRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            value={form.password}
            onChange={handleChange}
            required
          />
          {showRegister && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="company">Company</option>
              <option value="vendor">Vendor</option>
            </select>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {showRegister ? 'Register & Go to Dashboard' : 'Login'}
          </button>
        </form>

        {!showRegister && (
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <button onClick={() => setShowRegister(true)} className="text-blue-600 underline">
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
