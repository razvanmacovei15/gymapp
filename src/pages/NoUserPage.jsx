import React from 'react';

const NoUserPage = () => {
  
  const handleGoBack = () => {
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          You are not logged in
        </h1>
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Go back to login page
        </button>
      </div>
    </div>
  );
};

export default NoUserPage;
