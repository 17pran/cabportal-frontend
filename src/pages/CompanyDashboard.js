import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MapComponent from '../components/MapComponent';
import BookingForm from '../components/BookingForm';
import InvoiceSection from '../components/InvoiceSection';
import BookingModal from '../components/BookingModal';
import BookingTable from '../components/BookingTable';

const TABS = ['Ongoing', 'Upcoming', 'Completed', 'Cancelled'];

function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      navigate('/register'); // Redirect immediately if not authenticated
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchBookings();
  }, [token, BACKEND_URL, navigate]);

  const updateBookingStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/bookings/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartTrip = (id) => updateBookingStatus(id, 'Ongoing');
  const handleEndTrip = (id) => updateBookingStatus(id, 'Completed');
  const handleCancel = (id) => updateBookingStatus(id, 'Cancelled');

  const filteredBookings = bookings.filter(
    (b) =>
      b.status === activeTab &&
      b.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase()) &&
      (b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white rounded-xl shadow-md px-6 py-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Company Dashboard</h1>
        <span className="text-gray-500">Welcome, Company User</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Place New Booking</h2>
          <BookingForm />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Live Booking Monitor</h2>
          <MapComponent />
        </div>
      </div>

      <BookingTable />

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by guest or vendor..."
          className="col-span-2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
        >
          <option value="">All Vehicles</option>
          <option>Sedan</option>
          <option>Hatchback</option>
          <option>SUV</option>
          <option>Luxury</option>
        </select>
      </div>

      <div className="mb-4 flex space-x-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">Booking #{booking._id.slice(-5)}</h3>
              <p className="text-sm text-gray-600">Guest: {booking.guestName}</p>
              <p className="text-sm text-gray-600">Trip Type: {booking.tripType}</p>
              <p className="text-sm text-gray-600">Vehicle: {booking.vehicle}</p>
              <p className="text-sm text-gray-600">Vendor: {booking.vendor}</p>
              <p className="text-sm text-gray-600">Status: {booking.status}</p>
              <p className="text-sm text-gray-500">Date: {new Date(booking.datetime).toLocaleString()}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm"
                >
                  View Details
                </button>

                {booking.status === 'Upcoming' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No bookings found for this tab.</p>
        )}
      </div>

      <InvoiceSection invoices={bookings.filter((b) => b.status === 'Completed')} />
      <BookingModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onStart={handleStartTrip}
        onEnd={handleEndTrip}
      />
    </div>
  );
}

export default CompanyDashboard;
