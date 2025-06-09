import '../styles/dashboard.css';
import MOCK_USER from '../utils/user.js'
import { useState } from 'react';
import xpTable from '../utils/levels.js'
import React from 'react';
import '../styles/progressBar.css';

const maxXp = xpTable[MOCK_USER.level];

function ProgressBar(){
    const fillPercentage = Math.min((MOCK_USER.xp / maxXp) * 100, 100);
    return(
        <>
         <div className='progress-bar'>
            <div className='progress-text'>XP progress till next level:</div>
            <div className="progress-bar-container">
               
                <div className="progress-bar-fill" style={{ width: `${fillPercentage}%` }}></div>
                <span className="progress-bar-text">{MOCK_USER.xp} / {maxXp} XP</span>
                
            </div>
            <div className='progress-percent'>{fillPercentage.toFixed(0)}%</div>
         </div>
              
        </>
    );
};

export default ProgressBar;