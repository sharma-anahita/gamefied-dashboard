import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../utils/user';
import '../styles/pages/Goals.css';

const Goals = () => {
  const { user, refreshUser } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', deadline: '' });
  const [adding, setAdding] = useState(false);

  const fetchGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/goals', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch goals');
      const data = await res.json();
      setGoals(data.goals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddGoal = async e => {
    e.preventDefault();
    setAdding(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add goal');
      setForm({ title: '', description: '', deadline: '' });
      await fetchGoals();
      refreshUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleComplete = async goalId => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/goals/${goalId}/complete`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to complete goal');
      await fetchGoals();
      refreshUser();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="goals-page">
      <h2>Goals</h2>
      <form className="goals-form" onSubmit={handleAddGoal}>
        <input
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Goal title"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Description"
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleInput}
        />
        <button type="submit" disabled={adding}>
          {adding ? 'Adding...' : 'Add Goal'}
        </button>
      </form>
      {loading ? (
        <div>Loading goals...</div>
      ) : error ? (
        <div className="goal-error">Error: {error}</div>
      ) : (
        <ul className="goals-list">
          {goals.map(goal => (
            <li key={goal._id} className="goals-list-item">
              <div className="goal-title">
                {goal.title} {goal.completed && <span className="goal-completed">(Completed)</span>}
              </div>
              <div>{goal.description}</div>
              {goal.deadline && <div>Deadline: {new Date(goal.deadline).toLocaleDateString()}</div>}
              {!goal.completed && (
                <button className="goal-complete-btn" onClick={() => handleComplete(goal._id)}>
                  Mark Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Goals;
