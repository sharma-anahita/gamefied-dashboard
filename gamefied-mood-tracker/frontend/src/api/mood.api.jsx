// src/api/mood.api.js

import api from './api.jsx';

export const addMood = async (mood, note = '') => {
  return await api.post('/moods/add', { mood, note });
};

export const getMoodHistory = async () => {
  return await api.get('/moods/history');
};