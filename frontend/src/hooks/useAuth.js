// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBase } from '../utils/api';

export const useAuth = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch(`${apiBase}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const userData = await response.json();
      localStorage.setItem('token', userData.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or server error');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  return { login, logout, getUser, error };
};
