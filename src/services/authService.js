// src/api/authAgent.js
import { post } from '../api/agent';

const login = (credentials) => post('/Authentication/login', credentials);

const resetPasswordRequest = (email) => post('/Authentication/reset-password-request', { email });

const resetPassword = (data) => post('/Authentication/reset-password', data);

const refreshToken = (token) => post('/Authentication/refresh', { token });

const revokeRefreshToken = (token) => post('/Authentication/revoke', { token });

export { login, resetPasswordRequest, resetPassword, refreshToken, revokeRefreshToken };
