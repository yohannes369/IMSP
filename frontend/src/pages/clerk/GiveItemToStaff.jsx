
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { FiPackage, FiUser, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/Footer/Footer'; // Adjust path as needed

const GiveItemToStaff = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [scannedItem, setScannedItem] = useState(null);

  // Fetch approved requests
  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/requests/clerk/pending');
        const requests = Array.isArray(res.data) ? res.data : [res.data];
        setApprovedRequests(requests);

        // Auto-select the first request if available
        if (requests.length > 0) {
          setSelectedRequest(requests[0]);
        }
      } catch (err) {
        setMessage({ text: 'Failed to load approved requests.', type: 'error' });
      }
    };
    fetchApprovedRequests();
  }, []);

  // Give item to staff
  const handleGiveItem = async () => {
    if (!selectedRequest) {
      setMessage({ text: 'No request available.', type: 'warning' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    setBarcode('');
    setScannedItem(null);

    try {
      const res = await axios.post('http://localhost:5000/api/requests/clerk/give', {
        request_id: selectedRequest.id,
      });

      const { message: msg, barcode: givenBarcode, itemDetails } = res.data;
      setMessage({ text: msg || 'Item successfully given.', type: 'success' });
      setBarcode(givenBarcode || '');

      if (itemDetails) {
        setScannedItem({
          id: itemDetails.id,
          staffId: itemDetails.staff_id,
          staffName: itemDetails.staff_name,
          itemType: itemDetails.item_type,
          itemSerial: itemDetails.item_serial,
          quantityGiven: itemDetails.quantity,
          givenAt: itemDetails.given_at,
          barcode: itemDetails.barcode
        });
      }

      // Remove given request from the list
      setApprovedRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
      setSelectedRequest(null);

    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Error processing item.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex items-center space-x-4">
              <FiPackage className="text-3xl" />
              <div>
                <h1 className="text-2xl font-bold">Inventory Management System</h1>
                <p className="text-blue-100">Give items to staff members</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Message Display */}
            {message.text && (
              <div className={`p-4 mb-6 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700' : message.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                <div className="flex items-center">
                  {message.type === 'error' || message.type === 'warning' ? <FiAlertCircle className="mr-2" /> : <FiCheckCircle className="mr-2" />}
                  {message.text}
                </div>
              </div>
            )}

            {/* Request Form */}
            {selectedRequest ? (
              <div className="mb-6 bg-gray-50 p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiUser className="mr-2 text-blue-500" />
                  Staff Request Form
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Staff Name</p>
                    <p className="font-medium">{selectedRequest.staff_name}</p>
                    <p className="text-sm text-gray-600">ID: {selectedRequest.staff_id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Item Type</p>
                    <p className="font-medium">{selectedRequest.item_type}</p>
                    <p className="text-sm text-gray-600">Serial: {selectedRequest.item_serial}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Quantity Requested</p>
                    <p className="font-medium">{selectedRequest.quantity}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Request Date</p>
                    <p className="font-medium">{new Date(selectedRequest.request_date || selectedRequest.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Give Item Button */}
                <button
                  onClick={handleGiveItem}
                  disabled={loading}
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                >
                  {loading ? 'Processing...' : 'Give Item'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No approved requests available</p>
              </div>
            )}

            {/* Given Item Details */}
            {scannedItem && (
              <div className="mt-8 bg-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                  <FiPackage className="mr-2" /> Item Given Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Staff</p>
                    <p className="font-medium">{scannedItem.staffName} (ID: {scannedItem.staffId})</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Item Type</p>
                    <p className="font-medium">{scannedItem.itemType}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Serial Number</p>
                    <p className="font-medium">{scannedItem.itemSerial}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{scannedItem.quantityGiven}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Given At</p>
                    <p className="font-medium">{new Date(scannedItem.givenAt).toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Barcode</p>
                    <p className="font-medium">{scannedItem.barcode}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Barcode QR */}
            {barcode && (
              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Item Barcode</h3>
                <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                  <QRCodeCanvas value={barcode} size={180} />
                  <p className="mt-3 font-mono text-sm bg-gray-100 p-2 rounded">{barcode}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default GiveItemToStaff;