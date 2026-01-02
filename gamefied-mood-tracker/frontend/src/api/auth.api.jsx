// src/api/auth.api.js

import api from './api.jsx';

export const login = async (email, password) => {
  const data = await api.post('/auth/login', { email, password });
  
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  
  return data;
};

export const register = async (username, email, password) => {
  const data = await api.post('/auth/register', { username, email, password });
  
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
};

export const updateDetails = async (updates) => {
  return await api.put('/auth/update', updates);
};

export const updatePassword = async (currentPassword, newPassword) => {
  return await api.put('/auth/update-password', { currentPassword, newPassword });
};

export const deleteAccount = async (password) => {
  await api.delete('/auth/delete', { body: { password } });
  localStorage.removeItem('token');
};