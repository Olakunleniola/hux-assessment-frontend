import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to the Contact Manager</h1>
      <p className="mt-4 text-lg">
        A simple app to manage your contacts efficiently.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
