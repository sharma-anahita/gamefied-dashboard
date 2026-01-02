// src/api/stats.api.js

import api from './api.jsx';

export const getWeeklyStats = async () => {
  return await api.get('/stats/weekly');
};

export const getMonthlyStats = async () => {
  return await api.get('/stats/monthly');
};