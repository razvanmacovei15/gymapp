import React from "react";
import { Link } from "react-router-dom";

const NoUserPage = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ background: "linear-gradient(to bottom, #0f0f0f, #831843)" }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-950 mb-4">
          You are not logged in
        </h1>
        <Link
          to="/gymapp/login"
          className="px-6 py-3 bg-gray-950 text-white font-medium rounded hover:bg-gray-900"
        >
          Go back to login page
        </Link>
      </div>
    </div>
  );
};

export default NoUserPage;
