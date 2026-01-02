// src/pages/Dashboard.jsx

import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { getProgress } from '../api/user.api.jsx';
import Mood from '../components/dashboard/Mood.jsx';
import ProgressBar from '../components/dashboard/ProgressBar.jsx';
import StatsChart from '../components/dashboard/StatsChart.jsx';
import Xp from '../components/dashboard/Xp.jsx';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  const { user, refetchUser } = useUser();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getProgress();
        setProgress(data.progressToNextLevel);
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* User Stats Section */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <h3 className="dashboard-stat-title">Level</h3>
          <p className="dashboard-stat-value">{user.level}</p>
        </div>

        <div className="dashboard-stat-card">
          <h3 className="dashboard-stat-title">Coins</h3>
          <p className="dashboard-stat-value">{user.coins}</p>
        </div>

        <div className="dashboard-stat-card">
          <h3 className="dashboard-stat-title">Streak</h3>
          <p className="dashboard-stat-value">{user.streak} 🔥</p>
        </div>
      </div>

      {/* XP and Progress */}
      <div className="dashboard-xp-section">
        <Xp xp={user.xp} level={user.level} />
        {progress && (
          <ProgressBar 
            current={progress.current} 
            needed={progress.needed} 
            percentage={progress.percentage} 
          />
        )}
      </div>

      {/* Mood Section */}
      <div className="dashboard-mood-section">
        <Mood onMoodAdded={refetchUser} />
      </div>

      {/* Stats Chart */}
      <div className="dashboard-chart-section">
        <StatsChart />
      </div>
    </div>
  );
};

export default Dashboard;