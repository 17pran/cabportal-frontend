import React from 'react';

function BookingModal({ booking, onClose, onStart, onEnd }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Booking #{booking.id}</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Guest:</strong> {booking.guestName}</li>
          <li><strong>Trip Type:</strong> {booking.tripType}</li>
          <li><strong>Vehicle:</strong> {booking.vehicle}</li>
          <li><strong>Vendor:</strong> {booking.vendor}</li>
          <li><strong>Pickup:</strong> {booking.pickup}</li>
          <li><strong>Drop-off:</strong> {booking.dropoff}</li>
          <li><strong>Date & Time:</strong> {booking.datetime}</li>
          <li><strong>Status:</strong> {booking.status}</li>
        </ul>

        <div className="mt-4 flex justify-between">
          {booking.status === 'Upcoming' && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => onStart(booking.id)}
            >
              Start Trip
            </button>
          )}
          {booking.status === 'Ongoing' && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => onEnd(booking.id)}
            >
              End Trip
            </button>
          )}
          <button
            className="ml-auto bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
