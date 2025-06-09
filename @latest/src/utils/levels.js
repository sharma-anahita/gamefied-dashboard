

function XPLevels(levels = 100, baseXP = 100) {
  const xpLevels = {};
  let totalXP = 0;

  for (let level = 1; level <= levels; level++) {
    const xpToNext = baseXP * level; // exponential-like growth
    xpLevels[level] = totalXP;
    totalXP += xpToNext;
  }

  return xpLevels;
}

// Generate XP table with desired settings
const xpTable = XPLevels(100, 100);

// Export the XP table object
export default xpTable;
