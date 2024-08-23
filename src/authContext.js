import React, { useReducer, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Create context
export const AuthContext = React.createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Reducer function to update state based on action type
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Save token and user data to local storage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      // Clear local storage and reset state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// AuthProvider component to wrap the app and provide the context
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // Check for existing token and user in local storage on app load
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch({ type: "LOGIN", payload: { token, user } });
      navigate("/contacts")
    } 
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
