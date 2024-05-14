import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import { refreshToken as refreshAuthToken } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleTokenRefresh = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        console.log("Refreshing token...");
        const response = await refreshAuthToken({ token: refreshToken });
        console.log("Token refreshed:", response.token);
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async (token) => {
    try {
      console.log("Verifying token...");
      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        console.log("Token is valid");
        setIsAuthenticated(true);
      } else {
        console.log("Token is expired, refreshing...");
        await handleTokenRefresh();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [handleTokenRefresh]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, [verifyToken]);

  const login = () => {
    console.log("User logged in");
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("User logged out");
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
