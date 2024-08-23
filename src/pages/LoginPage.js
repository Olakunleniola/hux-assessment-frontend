import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { login } from "../utils/utils";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await login(email, password);

    if (response.error) {
      setError(response.error);
    } else {
      // Save the user info to context
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.token,
          user: response.user,
        },
      });

      // Redirect to the ContactsPage
      navigate("/contacts");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-blue-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        {error && <div className="p-2 text-red-400 bg-red-800 rounded mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white rounded-md shadow-md ${loading ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

