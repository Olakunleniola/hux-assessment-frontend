import React from "react";
import { useAuth } from "../authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { state } = useAuth();

  return state.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
