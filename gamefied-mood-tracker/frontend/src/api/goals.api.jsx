// src/api/goals.api.js

import api from './api.jsx';

export const getGoals = async () => {
  return await api.get('/goals');
};

export const addGoal = async (title, description, deadline) => {
  return await api.post('/goals', { title, description, deadline });
};

export const completeGoal = async (goalId) => {
  return await api.patch(`/goals/${goalId}/complete`);
};