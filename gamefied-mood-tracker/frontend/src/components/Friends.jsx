import { useState } from 'react';
import '../styles/dashboard.css';

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
            <div className="search-bar">
              <input 
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #00c3ff',
                  backgroundColor: '#1a1a2e',
                  color: 'white',
                  marginBottom: '20px'
                }}
              />
            </div>

            <div className="friends-list">
              {filteredFriends.map(friend => (
                <div key={friend.id} className="friend-card" style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  margin: '10px 0',
                  backgroundColor: '#16213e',
                  borderRadius: '10px',
                  border: '1px solid #00c3ff'
                }}>
                  <div className="friend-avatar" style={{
                    fontSize: '2rem',
                    marginRight: '15px'
                  }}>
                    {friend.avatar}
                  </div>
                  
                  <div className="friend-info" style={{ flex: 1 }}>
                    <h3 style={{ color: 'white', margin: '0 0 5px 0' }}>
                      {friend.name}
                    </h3>
                    <p style={{ color: '#888', margin: 0 }}>
                      Level {friend.level}
                    </p>
                  </div>
                  
                  <div className="friend-status" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(friend.status)
                    }}></div>
                    <span style={{ 
                      color: getStatusColor(friend.status),
                      textTransform: 'capitalize'
                    }}>
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