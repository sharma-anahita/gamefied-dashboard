import { useState } from 'react';
import '../styles/components/Friends.css';

const MOCK_FRIENDS = [
  { id: 1, name: 'Alex Johnson', level: 15, status: 'online', avatar: '👨‍💻' },
  { id: 2, name: 'Sarah Chen', level: 12, status: 'offline', avatar: '👩‍🎨' },
  { id: 3, name: 'Mike Rodriguez', level: 18, status: 'online', avatar: '👨‍🚀' },
  { id: 4, name: 'Emma Wilson', level: 9, status: 'away', avatar: '👩‍🔬' },
];

function Friends() {
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#00ff88';
      case 'away': return '#ffaa00';
      case 'offline': return '#888888';
      default: return '#888888';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <div className="dashboard-content">
          <header className="name-display">
            <h2 className='welcome-msg'>Friends</h2>
          </header>
          
          <div className="friends-container">
            <div className="friends-search-bar">
              <input
                className="friends-search-input"
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="friends-list">
              {filteredFriends.map(friend => (
                <div key={friend.id} className="friend-card">
                  <div className="friend-avatar">{friend.avatar}</div>
                  <div className="friend-info">
                    <h3>{friend.name}</h3>
                    <p>Level {friend.level}</p>
                  </div>
                  <div className="friend-status">
                    <span
                      className="friend-status-dot"
                      style={{ backgroundColor: getStatusColor(friend.status) }}
                    ></span>
                    <span
                      className="friend-status-label"
                      style={{ color: getStatusColor(friend.status) }}
                    >
                      {friend.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;