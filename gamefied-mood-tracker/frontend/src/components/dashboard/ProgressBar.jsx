// src/components/dashboard/ProgressBar.jsx

import '../../styles/components/ProgressBar.css';

const ProgressBar = ({ current, needed, percentage }) => {
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">Progress to Next Level</span>
        <span className="progress-stats">
          {current} / {needed} XP
        </span>
      </div>
      
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          {percentage > 10 && (
            <span className="progress-percentage">{percentage}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;