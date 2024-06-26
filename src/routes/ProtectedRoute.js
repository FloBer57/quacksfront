import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated, "loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // Ou un spinner de chargement
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
