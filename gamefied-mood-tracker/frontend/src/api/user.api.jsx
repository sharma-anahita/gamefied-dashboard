// src/api/user.api.js

import api from './api.jsx';

export const getMe = async () => {
  return await api.get('/auth/me');
};

export const getProgress = async () => {
  const { user } = await api.get('/auth/me');
  
  // Calculate progress to next level
  const baseXP = 100;
  const currentLevelXP = baseXP * (user.level - 1);
  const nextLevelXP = baseXP * user.level;
  const xpInCurrentLevel = user.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  
  return {
    ...user,
    progressToNextLevel: {
      current: xpInCurrentLevel,
      needed: xpNeededForLevel,
      percentage: Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100)
    }
  };
};