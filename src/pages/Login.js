import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust path if needed

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userEmail', user.email);
      window.dispatchEvent(new Event('storage'));

      navigate(user.role === 'company' ? '/company' : '/vendor');
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Login failed';

      if (status === 404) {
        setError(
          <>
            {message}.{' '}
            <Link to="/register" className="text-blue-600 underline font-medium">
              Register here
            </Link>
          </>
        );
      } else {
        setError(message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-10">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Login</button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New user?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
