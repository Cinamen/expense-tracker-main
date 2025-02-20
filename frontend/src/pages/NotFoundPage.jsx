import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className=" rounded-lg p-8">
        <h1 className="text-6xl font-bold text-blue_c">404</h1>
        <p className="text-xl mt-4">Oops! Page not found.</p>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block px-4 py-2 text-white bg-blue_c rounded hover:bg-blue-700">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
