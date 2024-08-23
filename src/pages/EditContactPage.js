import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContactById, updateContact } from "../utils/utils";

export default function UpdateContactPage() {
  const { id } = useParams(); // Get the contact ID from the URL parameters
  const [contact, setContact] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      const response = await getContactById(id);
      if (response.error) {
        setError(response.error);
      } else {
        setContact(response); // Set the contact details for editing
      }
      setLoading(false);
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const response = await updateContact(id, contact);

    if (response.error) {
      setError(response.error);
    } else {
      setSuccess("Contact updated successfully!");
      setTimeout(() => {
        navigate(`/contacts/${id}`); // Redirect to the contact detail page
      }, 1000);
    }

    setLoading(false);
  };

  if (loading && !success) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-6 text-center">Update Contact</h1>
        {error && <div className="p-2 text-red-400 bg-red-800 rounded mb-4">{error}</div>}
        {success && <div className="p-2 text-green-400 bg-green-800 rounded mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contact.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contact.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contact.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white rounded-md shadow-md ${loading ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Contact"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(`/contacts/${id}`)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Contact Details
          </button>
        </div>
      </div>
    </div>
  );
}
