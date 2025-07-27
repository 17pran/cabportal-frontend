import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'company',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDashboardLink, setShowDashboardLink] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = 'demo-token';
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', form.role);
      localStorage.setItem('userEmail', form.email);
      localStorage.setItem('userName', form.name);

      window.dispatchEvent(new Event('storage'));
      alert('Registration successful!');
      setShowDashboardLink(true);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => {
    navigate(form.role === 'company' ? '/company' : '/vendor');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-10">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="company">Company</option>
            <option value="vendor">Vendor</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* 🔗 Show dashboard button once registered */}
        {showDashboardLink && (
          <div className="mt-6 text-center">
            <button
              onClick={goToDashboard}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Go to {form.role === 'company' ? 'Company' : 'Vendor'} Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
