import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import LoginForm from './pages/Login';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routes/ProtectedRoute';
import RedirectIfAuthenticated from './routes/RedirectIfAuthenticated';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LoginForm />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
