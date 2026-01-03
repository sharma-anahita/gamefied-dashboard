import React from 'react';
import "../../styles/components/Friends/FriendCard.css";

const FriendCard = ({ friend }) => {
  // Structure ready for future backend data
  return (
    <div className="friend-card">
      <div className="friend-card__avatar">{friend.avatar || '👤'}</div>
      <div className="friend-card__info">
        <div className="friend-card__name">{friend.name}</div>
        <div className="friend-card__meta">Level {friend.level || '-'}</div>
      </div>
    </div>
  );
};

export default FriendCard;
