import React, { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../utils/utils";
import { Link } from "react-router-dom";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]); // Initialize contacts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const response = await getContacts();
      if (response.error) {
        setError(response.error);
      } else {
        setContacts(response || []); // Directly set the array of contacts
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteContact(id);
    if (response.error) {
      setError(response.error);
    } else {
      setContacts(contacts.filter(contact => contact._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-6 text-center">Contacts</h1>
        <div className="mb-4 flex justify-between items-center">
          <Link to="/contacts/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create New Contact
          </Link>
          {error && <div className="p-2 text-red-400 bg-red-800 rounded">{error}</div>}
        </div>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-md">
            <ul className="divide-y divide-gray-700">
              {contacts.length === 0 ? (
                <li className="p-4 text-center">No contacts found</li>
              ) : (
                contacts.map(contact => (
                  <li key={contact._id} className="p-4 flex justify-between items-center space-y-4 border-b border-gray-700 last:border-b-0">
                    <div>
                      <h2 className="text-xl font-semibold">{contact.firstName} {contact.lastName}</h2>
                      <p className="text-gray-400">{contact.phoneNumber}</p>
                    </div>
                    <div className="flex space-x-4">
                      <Link to={`/contacts/${contact._id}`} className="text-blue-400 hover:underline">
                        View
                      </Link>
                      <Link to={`/contacts/edit/${contact._id}`} className="text-blue-400 hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
