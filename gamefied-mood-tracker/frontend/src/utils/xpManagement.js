import xpTable from "./levels";
import MOCK_USER from './user';
 
export function calculateLevel(totalXP) {
    for (let level = 0; level < xpTable.length; level++) {
        if (totalXP < xpTable[level]) {
            return level + 1; // Return 1-based level
        }
    }
    return xpTable.length + 1; // Max level + 1
}


export function getXPForNextLevel(currentLevel) {
  if (currentLevel >= xpTable.length) { 
    return xpTable[xpTable.length - 1] + (currentLevel - xpTable.length + 1) * 100;
  }
  return xpTable[currentLevel] || xpTable[xpTable.length - 1];
}
export function getXPForCurrentLevel(currentLevel) {
  const levelIndex = currentLevel - 1;
  if (levelIndex <= 0) return 0;
  if (levelIndex >= xpTable.length) {
    return xpTable[xpTable.length - 1] + (levelIndex - xpTable.length + 1) * 1000;
  }
  return xpTable[levelIndex - 1] || 0;
}
export function addXP(currentUser, xpToAdd) {
  const newTotalXP = currentUser.xp + xpToAdd;
  const oldLevel = currentUser.level;
  const newLevel = calculateLevel(newTotalXP);
  const leveledUp = newLevel > oldLevel;
  
  const updatedUser = {
    ...currentUser,
    xp: newTotalXP,
    level: newLevel
  };

  // Save to localStorage
  localStorage.setItem('userStats', JSON.stringify({
    xp: newTotalXP,
    level: newLevel,
    lastUpdated: new Date().toISOString()
  }));

  return {
    user: updatedUser,
    leveledUp,
    oldLevel,
    newLevel,
    xpGained: xpToAdd
  };
}


export function calculateXPFromChars(charCount) {
  return Math.floor(charCount / 10);
}