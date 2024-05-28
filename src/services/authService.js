import { post } from '../api/agent';
import {jwtDecode} from 'jwt-decode';

const login = (credentials) => post('/Authentication/login', credentials);
const resetPasswordRequest = (email) => post('/Authentication/reset-password-request', { email });
const resetPassword = (data) => post('/Authentication/reset-password', data);
const refreshToken = (data) => post('/Authentication/refresh', data);
const revokeRefreshToken = (refreshToken) => post('/Authentication/revoke', { refreshToken }); 

const getToken = () => localStorage.getItem('token');

const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const getUserRoleFromToken = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export { login, resetPasswordRequest, resetPassword, refreshToken, revokeRefreshToken, getUserIdFromToken, getUserRoleFromToken, getToken };
