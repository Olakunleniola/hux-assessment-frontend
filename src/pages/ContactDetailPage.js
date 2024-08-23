import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getContactById, deleteContact } from "../utils/utils";

export default function ContactDetailPage() {
  const { id } = useParams(); // Get the contact ID from the URL parameters
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      const response = await getContactById(id);
      if (response.error) {
        setError(response.error);
      } else {
        setContact(response); // Set the contact details
      }
      setLoading(false);
    };

    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    const response = await deleteContact(id);
    if (response.error) {
      setError(response.error);
    } else {
      // Redirect to the contacts page after successful deletion
      navigate("/contacts");
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  if (!contact) {
    return <div className="text-center">Contact not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-6 text-center">Contact Details</h1>
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{contact.firstName} {contact.lastName}</h2>
          <p className="text-lg mb-4">Phone Number: {contact.phoneNumber}</p>
          <div className="flex justify-end space-x-4">
            <Link to={`/contacts/edit/${contact._id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <Link to="/contacts" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Back to Contacts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
