import '../styles/dashboard.css';
import MOCK_USER from '../utils/user.js'
import { useState } from 'react';
import xpTable from '../utils/levels.js'
import React from 'react';
import '../styles/xp.css';

const maxXp = xpTable[MOCK_USER.level];

function Xp(){
    const fillPercentage = Math.min((MOCK_USER.xp / maxXp) * 100, 100);
    return(
        <>
            <div className="xp-bar-container">
                <div className="xp-bar-fill" style={{ width: `${fillPercentage}%` }}></div>
                <span className="xp-bar-text">{MOCK_USER.xp} / {maxXp} XP</span>
            </div>
            <div className="xp-box">
            <p>XP: {MOCK_USER.xp}</p>
            <p>Level: {MOCK_USER.level}</p>
            <p>Streak: {MOCK_USER.streak}</p>
            <p>Last Action: {MOCK_USER.lastAction}</p>
        </div>
        </>
    );
};

export default Xp;