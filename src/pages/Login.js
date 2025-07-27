import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      if (res.data.user.role === 'company') {
        navigate('/company-dashboard');
      } else if (res.data.user.role === 'vendor') {
        navigate('/vendor-dashboard');
      }
    } catch (err) {
  const message = err.response?.data?.message;
  if (message === 'User not found') {
    setError('User not found. Please register first.');
  } else if (message === 'Invalid credentials') {
    setError('Wrong password. Please try again.');
  } else {
    setError('Login failed. Please try again.');
  }
}
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-sm text-center">
  New user?{' '}
  <Link to="/register" className="text-blue-600 hover:underline">
    Register here
  </Link>
</p>
      </form>
    </div>
  );
}

export default Login;
