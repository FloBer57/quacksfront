import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import LoginForm from "./pages/Login";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Unauthorized from "./pages/Unauthorized";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import ProtectedRoute from "./routes/ProtectedRoute";
import RedirectIfAuthenticated from "./routes/RedirectIfAuthenticated";
import "react-toastify/dist/ReactToastify.css";

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
          <Route
            path="/adminPage"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userPage"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
