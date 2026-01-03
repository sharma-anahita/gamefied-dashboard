import React from 'react';
import '../../styles/components/Friends/EmptyFriendsState.css';

const EmptyFriendsState = () => (
  <div className="empty-friends-state">
    <div className="empty-friends-state__icon">🫂</div>
    <div className="empty-friends-state__title">No friends yet</div>
    <div className="empty-friends-state__desc">
      You haven’t added any friends. When you do, they’ll show up here!
    </div>
  </div>
);

export default EmptyFriendsState;
