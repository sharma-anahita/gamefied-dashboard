import '../styles/dashboard.css';
import '../styles/progressBar.css';
import xpTable from '../utils/levels.js';
import React from 'react';

function ProgressBar({ user }) { 
    
    const currentLevelXP = user.level > 1 ? (xpTable[user.level - 2] || 0) : 0;
    const nextLevelXP = xpTable[user.level - 1] || (xpTable[xpTable.length - 1] + 1000);
    
    const xpInLevel = user.xp - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    
    // Ensure we don't get negative percentages
    const fillPercentage = Math.max(0, Math.min((xpInLevel / xpNeededForLevel) * 100, 100));

    return (
        <div className='progress-bar'>
            <div className='progress-text'>XP progress till next level:</div>
            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${fillPercentage}%` }}></div>
                <span className="progress-bar-text">{xpInLevel} / {xpNeededForLevel} XP</span>
            </div>
            <div className='progress-percent'>{fillPercentage.toFixed(0)}%</div>
        </div>
    );
}

export default ProgressBar;