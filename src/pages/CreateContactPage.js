import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../utils/utils";

export default function CreateContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await createContact({ firstName, lastName, phoneNumber });

    if (response.error) {
      setError(response.error);
    } else {
      navigate("/contacts");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-blue-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Create Contact</h2>
        {error && <div className="p-2 text-red-400 bg-red-800 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white rounded-md shadow-md ${loading ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Contact"}
          </button>
        </form>
      </div>
    </div>
  );
}
