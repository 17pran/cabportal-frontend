// frontend/src/components/InvoiceSection.js
import React from 'react';

function InvoiceSection({ invoices }) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Invoices</h2>

      {invoices.length === 0 ? (
        <p className="text-gray-500">No completed bookings available for invoice.</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Booking ID</th>
                <th className="py-2 px-4 text-left">Guest</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Trip Type</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Vehicle</th>
                <th className="py-2 px-4 text-left">Vendor</th>
                <th className="py-2 px-4 text-left">Payment</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv._id} className="border-b">
                  <td className="py-2 px-4">{inv._id}</td>
                  <td className="py-2 px-4">{inv.guestName}</td>
                  <td className="py-2 px-4">{inv.email}</td>
                  <td className="py-2 px-4">{inv.tripType}</td>
                  <td className="py-2 px-4">{new Date(inv.datetime).toLocaleString()}</td>
                  <td className="py-2 px-4">{inv.vehicle}</td>
                  <td className="py-2 px-4">{inv.vendor}</td>
                  <td className="py-2 px-4">
                    <span className="text-green-600 font-semibold">Paid</span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 underline hover:text-blue-800 text-sm"
                      onClick={() => window.print()} 
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InvoiceSection;
