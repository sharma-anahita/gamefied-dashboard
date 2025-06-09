// Dashboard.jsx
import '../styles/dashboard.css';
import Sidebar from '../components/sidebar.jsx';
import Xp from '../components/xp.jsx';

function Dashboard() {
  const username = JSON.parse(localStorage.getItem('username'));

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        < Sidebar />
        <div className="dashboard-content">
          <header className="name-display">
            <p>Welcome, {username ? username : 'Guest'}!</p>
          </header>
          <div className="dashboard">
            <h1>Dashboard Body</h1>
            <Xp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
