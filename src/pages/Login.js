import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, resetPasswordRequest, resetPassword } from '../services/authService';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [isResetRequest, setIsResetRequest] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      setIsResetPassword(true);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await login({ email, password });
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken.result);
      authLogin();
      toast.success(`Bonjour, vous êtes bien connecté!`);
      navigate('/home');
    } catch (error) {
      toast.error(`Erreur de connexion: ${error.message}`);
    }
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setResetError(null); // Clear previous errors
    try {
      const response = await resetPasswordRequest(resetEmail);
      console.log('Reset password request successful:', response);
      toast.success('Un lien de réinitialisation du mot de passe a été envoyé à votre adresse email.');
      setIsResetRequest(false);
    } catch (error) {
      setResetError(error.message);
      toast.error(`Erreur lors de la demande de réinitialisation: ${error.message}`);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError(null); // Clear previous errors
    try {
      const token = new URLSearchParams(window.location.search).get('token'); // Get token from URL
      const response = await resetPassword({ token, newPassword });
      console.log('Password reset successful:', response);
      toast.success('Votre mot de passe a été réinitialisé avec succès.');
      setIsResetPassword(false);
      navigate('/home');
    } catch (error) {
      setResetError(error.message);
      toast.error(`Erreur lors de la réinitialisation du mot de passe: ${error.message}`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 col-md-7 intro-section">
          <div className="brand-wrapper">
            <h1><a href="!#" className="text-decoration-none">Quackers</a></h1>
          </div>
          <div className="intro-content-wrapper">
            <h1 className="intro-title">Bienvenue sur Quackers!</h1>
            <p className="intro-text">
              Connecte-toi afin d'utiliser Quackers!
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-5 form-section">
          <div className="login-wrapper">
            <h2 className="login-title">
              {isResetRequest ? 'Réinitialiser le mot de passe' : isResetPassword ? 'Nouveau mot de passe' : 'Connecte-toi'}
            </h2>
            {isResetRequest ? (
              <form onSubmit={handleResetRequest}>
                <div className="form-group">
                  <label htmlFor="resetEmail" className="sr-only">Email</label>
                  <input
                    type="email"
                    name="resetEmail"
                    id="resetEmail"
                    className="form-control"
                    placeholder="Email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <input
                    name="resetRequest"
                    id="resetRequest"
                    className="btn login-btn"
                    type="submit"
                    value="Envoyer le lien de réinitialisation"
                  />
                  <button type="button" className="btn btn-link" onClick={() => setIsResetRequest(false)}>
                    Annuler
                  </button>
                </div>
              </form>
            ) : isResetPassword ? (
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label htmlFor="newPassword" className="sr-only">Nouveau mot de passe</label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="form-control"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <input
                    name="resetPassword"
                    id="resetPassword"
                    className="btn login-btn"
                    type="submit"
                    value="Réinitialiser le mot de passe"
                  />
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="sr-only">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <input
                    name="login"
                    id="login"
                    className="btn login-btn"
                    type="submit"
                    value="Connexion"
                  />
                  <button type="button" className="btn btn-link" onClick={() => setIsResetRequest(true)}>
                    Mot de passe oublié?
                  </button>
                </div>
              </form>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            {resetError && <div className="alert alert-danger">{resetError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
