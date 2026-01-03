import React from 'react';
import '../../styles/components/dashboard/RewardMessage.css';

const RewardMessage = ({ achievement, visible, onClose }) => {
  if (!visible || !achievement) return null;

  return (
    <div className="reward-modal-overlay" onClick={onClose}>
      <div className="reward-modal-container" onClick={e => e.stopPropagation()}>
        <div className="reward-modal-header">
          <h3>Achievement Unlocked!</h3>
        </div>
        <div className="reward-modal-body">
          <div className="reward-modal-name">{achievement.name}</div>
          <div className="reward-modal-desc">{achievement.description}</div>
          <div className="reward-modal-xp">XP: {achievement.xpReward}</div>
        </div>
        <button className="reward-modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RewardMessage;
