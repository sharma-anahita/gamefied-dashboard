import '../styles/dashboard.css';
import '../styles/xp.css';
import xpTable from '../utils/levels.js';

function Xp({ user }) {
    
    const currentLevelXP = user.level > 1 ? (xpTable[user.level - 2] || 0) : 0;
    const nextLevelXP = xpTable[user.level - 1] || (xpTable[xpTable.length - 1] + 1000);

    const xpInLevel = user.xp - currentLevelXP;
    const xpNeeded = nextLevelXP - currentLevelXP;

    return (
        <div className="xp-bar-container">
            <p className="xp-title">Experience Level: {user.level}</p>
            <span className="xp-text">{xpInLevel} / {xpNeeded} XP to next level</span>
        </div>
    );
}

export default Xp;
