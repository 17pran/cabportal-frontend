import { useState } from 'react';

function AssignModal({ booking, onClose, onAssign }) {
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleSubmit = () => {
    if (!driver.trim() || !vehicle.trim()) {
      return alert('Please fill in both fields.');
    }
    onAssign({ driver, vehicle });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Assign Driver & Vehicle</h2>
        
        <div className="text-gray-700 text-sm mb-4">
          <p><strong>Booking ID:</strong> {booking._id.slice(-6)}</p>
          <p><strong>Guest Name:</strong> {booking.guestName}</p>
          <p><strong>Pickup:</strong> {booking.pickup}</p>
          <p><strong>Dropoff:</strong> {booking.dropoff}</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Driver Name"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Vehicle Info"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignModal;
