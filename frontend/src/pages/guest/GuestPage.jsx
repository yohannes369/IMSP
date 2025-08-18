import React, { useState } from 'react';

const GuestPage = () => {
  const [code, setCode] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState('');

  const validCodes = ['GUEST2023', 'WELCOME123', 'ACCESS456'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validCodes.includes(code.toUpperCase())) {
      setAccessGranted(true);
      setError('');
    } else {
      setError('Invalid code. Please try again.');
      setCode('');
    }
  };

  if (accessGranted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Access Granted!</h1>
          <p className="text-gray-700">Welcome, guest! You now have access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Guest Access</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your guest code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. GUEST2023"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Contact host if you don't have a code
        </p>
      </div>
    </div>
  );
};

export default GuestPage;
