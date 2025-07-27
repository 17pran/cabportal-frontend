import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'company' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 🎯 Demo Mode: skip backend registration entirely
    const token = 'demo-token';
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', form.role);
    localStorage.setItem('userEmail', form.email);

    alert('Registration successful!'); // Optional UI feedback

    // 🚀 Redirect to dashboard based on selected role
    navigate(form.role === 'company' ? '/company-dashboard' : '/vendor-dashboard');

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-10">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <select name="role" value={form.role} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md">
            <option value="company">Company</option>
            <option value="vendor">Vendor</option>
          </select>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
