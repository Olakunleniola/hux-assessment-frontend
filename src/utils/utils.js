import axios from 'axios';

const url = "http://localhost:5000/api";

// Function to handle login
const login = async (email, password) => {
  try {
    const response = await axios.post(`${url}/auth/login`, { email, password });
    if (response.status === 200) {
      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
  } catch (error) {
    return { error: error.response?.data?.message || 'Login failed' };
  }
};

// Function to handle registration
const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${url}/auth/register`, { username, email, password });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    return { error: error.response?.data?.message || 'Registration failed' };
  }
};

// Function to get all contacts
const getContacts = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${url}/contacts`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return { error: error.response?.data?.message || 'Failed to fetch contacts' };
  }
};

// Function to create a new contact
const createContact = async (contactData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${url}/contacts`, contactData, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    if (response.status === 201) { 
      return response.data;
    }
  } catch (error) {
    return { error: error.response?.data?.message || 'Failed to create contact' };
  }
};

// Function to get a contact 
const getContactById = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${url}/contacts/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            },    
        })
        if (response.status === 200) {
            return response.data
        }
    }catch(error) {
        return { error: error.response?.data?.message || 'Failed to create contact' };
    }
}

// Function to update a contact  
const updateContact = async(id) =>  {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${url}/contacts/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            },    
        })
        if (response.status === 200) {
            return response.data
        }
    }catch(error) {
        return { error: error.response?.data?.message || 'Failed to create contact' };
    }
}

const deleteContact = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(`${url}/contacts/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },    
    })
    if (response.status === 200) {
        return response.data
    }
  }catch(error) {
      return { error: error.response?.data?.message || 'Failed to create contact' };
  }
}


export { login, register, getContacts, createContact, deleteContact, getContactById, updateContact };
