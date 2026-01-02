// src/api/achievements.api.js

import api from './api.js';

export const getAchievements = async () => {
  return await api.get('/achievements');
};