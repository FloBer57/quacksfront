import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import LoginForm from './pages/Login';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routes/ProtectedRoute'; // Assurez-vous que l'importation est correcte

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
