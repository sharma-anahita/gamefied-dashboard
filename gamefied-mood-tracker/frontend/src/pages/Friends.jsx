import React from 'react';
import FriendCard from '../components/Friends/FriendCard.jsx';
import EmptyFriendsState from '../components/Friends/EmptyFriendsState.jsx';
import '../styles/pages/Friends.css';

const Friends = () => {
  // Placeholder for future backend integration
  const friends = [];

  return (
    <div className="friends-page">
      <h2 className="friends-page__title">Friends</h2>
      {friends.length === 0 ? (
        <EmptyFriendsState />
      ) : (
        <div className="friends-list">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
