import React from 'react';

const UnauthorizedPage = () => {
  const handleGoBack = () => {
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          You are not authorized to be here
        </h1>
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-pink-950 text-white font-medium rounded hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300"
        >
          Go back to login page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
