import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './Login';
import { AuthProvider } from '../context/authContext';
import { login } from '../services/authService';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../services/authService');

test('login form submits and navigates to home page on success', async () => {
    login.mockResolvedValue({ token: 'fakeToken', refreshToken: 'fakeRefreshToken' });

    const { getByLabelText, getByText } = render(
        <AuthProvider>
            <Router>
                <LoginForm />
            </Router>
        </AuthProvider>
    );

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/mot de passe/i), { target: { value: 'Password123' } });
    fireEvent.click(getByText(/connexion/i));

    await waitFor(() => {
        expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password123' });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'fakeRefreshToken');
    });
});
