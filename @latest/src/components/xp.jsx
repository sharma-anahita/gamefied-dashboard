import '../styles/dashboard.css';
import MOCK_USER from '../utils/user.js'
import xpTable from '../utils/levels.js'
import '../styles/xp.css';

const maxXp = xpTable[MOCK_USER.level];

function Xp() {
    const fillPercentage = Math.min((MOCK_USER.xp / maxXp) * 100, 100);

    return (
        <div className="xp-bar-container">
            <p className="xp-title">Experience Level:  </p>
            <span className="xp-text">{MOCK_USER.xp} / {maxXp} XP</span>
        </div>
    );
}

export default Xp;
