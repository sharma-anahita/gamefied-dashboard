 
import React, { useState, useEffect } from 'react';

const RewardMessage = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="reward-message">
      <div className="reward-content">
        <span className="reward-text">{message}</span>
        <button 
          className="reward-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default RewardMessage;