// src/api/mood.api.js
// Compare this frontend API with backend moodRoutes.js and moodController.js.
// List any mismatches in routes, methods, request body, or response shape.

import api from './api.jsx';

export const addMood = async (mood, note = '') => {
  return await api.post('/moods/add', { mood, note });
};

export const getMoodHistory = async () => {
  return await api.get('/moods/history');
};