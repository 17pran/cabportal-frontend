import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'company',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('https://cabportal-backend.onrender.com/api/auth/register', form);

      sessionStorage.setItem('tempEmail', form.email);
      sessionStorage.setItem('tempPassword', form.password);

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-md"
            value={form.role}
            onChange={handleChange}
          >
            <option value="company">Company</option>
            <option value="vendor">Vendor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
