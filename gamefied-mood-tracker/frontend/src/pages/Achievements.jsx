import React, { useEffect, useState } from 'react';
import '../styles/pages/Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/achievements', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch achievements');
        const data = await res.json();
        setAchievements(data.achievements || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  // For demo: unlocked = in achievements, locked = not in achievements
  // In real app, backend should return all possible achievements and which are unlocked
  // Here, we only show unlocked as per backend

  return (
    <div className="achievements-page">
      <h2>Achievements</h2>
      {loading ? (
        <div className="achievements-loading">Loading achievements...</div>
      ) : error ? (
        <div className="achievements-error">Error: {error}</div>
      ) : (
        <div className="achievements-list">
          {achievements.length === 0 ? (
            <div className="achievements-none">No achievements unlocked yet.</div>
          ) : achievements.map(a => (
            <div className="achievement-badge unlocked" key={a._id}>
              <div className="badge-name">{a.name}</div>
              <div className="badge-desc">{a.description}</div>
              <div className="badge-xp">XP: {a.xpReward}</div>
              <div className="badge-date">Unlocked: {a.unlockedAt ? new Date(a.unlockedAt).toLocaleDateString() : ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;
