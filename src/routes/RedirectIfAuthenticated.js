import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default RedirectIfAuthenticated;
