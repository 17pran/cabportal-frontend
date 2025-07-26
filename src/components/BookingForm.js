import { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [form, setForm] = useState({
    guestName: '',
    passengers: '',
    email: '',
    mobile: '',
    address: '',
    tripType: 'Local',
    pickup: '',
    dropoff: '',
    datetime: '',
    vehicle: 'Sedan',
    vendor: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      ...form,
      passengers: parseInt(form.passengers, 10),
      datetime: new Date(form.datetime)
    };

    try {
      const token = localStorage.getItem('token');
await axios.post('https://cabportal-backend.onrender.com/api/bookings', payload);

      const res = await axios.post('http://localhost:5000/api/bookings', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('✅ Booking submitted!');
      console.log(res.data);
    } catch (err) {
      setMessage('❌ Failed to submit booking');
      console.error(err.response?.data || err.message);
    }
  };

  // ⏳ Helper functions for datetime constraints
  const getMinDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const getMaxDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" name="guestName" value={form.guestName} onChange={handleChange} placeholder="Guest Name" className="w-full px-3 py-2 border rounded-md" required />
      <input type="number" name="passengers" value={form.passengers} onChange={handleChange} placeholder="Number of Passengers" className="w-full px-3 py-2 border rounded-md" required />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded-md" required />
      <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full px-3 py-2 border rounded-md" required />
      <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full md:col-span-2 px-3 py-2 border rounded-md" required></textarea>
      <select name="tripType" value={form.tripType} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
        <option>Local</option>
        <option>Outstation</option>
      </select>
      <input type="text" name="pickup" value={form.pickup} onChange={handleChange} placeholder="Pickup Location" className="w-full px-3 py-2 border rounded-md" required />
      <input type="text" name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="Drop Location" className="w-full px-3 py-2 border rounded-md" required />

      {/* ✅ Date-time with constraints */}
      <input
        type="datetime-local"
        name="datetime"
        value={form.datetime}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md"
        required
        min={getMinDateTime()}
        max={getMaxDateTime()}
      />

      <select name="vehicle" value={form.vehicle} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
        <option>Sedan</option>
        <option>Hatchback</option>
        <option>SUV</option>
        <option>Luxury</option>
      </select>
      <input type="text" name="vendor" value={form.vendor} onChange={handleChange} placeholder="Vendor Name" className="w-full md:col-span-2 px-3 py-2 border rounded-md" required />

      <div className="md:col-span-2 text-right mt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Book Cab</button>
      </div>

      {message && (
        <div className="md:col-span-2 text-center text-sm text-green-600 mt-2">
          {message}
        </div>
      )}
    </form>
  );
}

export default BookingForm;
