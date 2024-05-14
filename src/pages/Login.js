import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/authContext';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken.result);
      authLogin();
      navigate('/home');
    } catch (error) {
      setError(error.message);
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
              Connecte toi afin d'utiliser Quackers!
            </p>
          </div>
          <div className="intro-section-footer">
          </div>
        </div>
        <div className="col-sm-6 col-md-5 form-section">
          <div className="login-wrapper">
            <h2 className="login-title">Connecte toi</h2>
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
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                <a href="#!" className="forgot-password-link"> Mot de passe oublié?</a>
              </div>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
