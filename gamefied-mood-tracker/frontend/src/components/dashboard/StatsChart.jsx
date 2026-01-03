
import React, { useEffect, useState } from 'react';
import '../../styles/components/dashboard/StatsChart.css';

const StatsChart = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/stats/weekly', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div className="stats-chart__error">Error: {error}</div>;
  if (!stats) return null;

  // Mood frequency chart data
  const moodLabels = {
    very_bad: 'Very Bad',
    bad: 'Bad',
    neutral: 'Neutral',
    good: 'Good',
    very_good: 'Very Good'
  };
  const moodColors = {
    very_bad: '#e57373',
    bad: '#ffb74d',
    neutral: '#fff176',
    good: '#81c784',
    very_good: '#64b5f6'
  };

  return (
    <div className="stats-chart">
      <h3>Weekly Stats</h3>
      <div className="stats-chart__xp">
        <strong>XP Gained:</strong> {stats.xpGained}
      </div>
      <div>
        <span className="stats-chart__mood-label">Mood Distribution:</span>
        <div className="stats-chart__mood-row">
          {['very_bad','bad','neutral','good','very_good'].map(mood => {
            const freqObj = stats.moodFrequency.find(m => m._id === mood);
            const count = freqObj ? freqObj.count : 0;
            return (
              <div key={mood} className="stats-chart__mood">
                <div
                  className="stats-chart__mood-circle"
                  style={{ background: moodColors[mood] }}
                >
                  {moodLabels[mood].split(' ')[0][0]}
                </div>
                <div className="stats-chart__mood-label-text">{moodLabels[mood]}</div>
                <div className="stats-chart__mood-count">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
