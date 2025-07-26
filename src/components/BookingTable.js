import { useEffect, useState } from 'react';
import axios from 'axios';

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('https://cabportal-backend.onrender.com/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data);
      } catch (err) {
        setError('❌ Failed to load bookings');
        console.error(err.response?.data || err.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📋 All Bookings</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Guest</th>
              <th className="border px-4 py-2">Pickup</th>
              <th className="border px-4 py-2">Dropoff</th>
              <th className="border px-4 py-2">Date & Time</th>
              <th className="border px-4 py-2">Vendor</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.guestName}</td>
                <td className="border px-4 py-2">{booking.pickup}</td>
                <td className="border px-4 py-2">{booking.dropoff}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.datetime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{booking.vendor}</td>
                <td className="border px-4 py-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingTable;
