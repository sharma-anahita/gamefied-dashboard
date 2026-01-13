import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import '../styles/pages/Goals.css';

const Goals = () => {
  const { user, refetchUser } = useContext(UserContext);
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
      const text = await res.text();
      if (text.startsWith('<!doctype') || text.startsWith('<html')) {
        throw new Error('Server returned HTML instead of JSON. Check API endpoint and proxy config.');
      }
      if (!res.ok) throw new Error('Failed to fetch goals');
      const data = JSON.parse(text);
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
    // Validate deadline is after today
    if (form.deadline) {
      const today = new Date();
      today.setHours(0,0,0,0);
      const deadlineDate = new Date(form.deadline);
      if (deadlineDate <= today) {
        setError('Please select a deadline after today.');
        setAdding(false);
        return;
      }
    }
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
      const text = await res.text();
      if (text.startsWith('<!doctype') || text.startsWith('<html')) {
        throw new Error('Server returned HTML instead of JSON. Check API endpoint and proxy config.');
      }
      if (!res.ok) throw new Error('Failed to add goal');
      setForm({ title: '', description: '', deadline: '' });
      await fetchGoals();
      refetchUser();
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
      const text = await res.text();
      if (text.startsWith('<!doctype') || text.startsWith('<html')) {
        throw new Error('Server returned HTML instead of JSON. Check API endpoint and proxy config.');
      }
      if (!res.ok) throw new Error('Failed to complete goal');
      await fetchGoals();
      refetchUser();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="goals-page" style={{ background: 'linear-gradient(135deg, #ffe0f0 0%, #ffb6e6 100%)', minHeight: '100vh', padding: '2rem' }}>
      <h2 style={{ color: '#d72660', textShadow: '1px 1px 0 #fff' }}>Goals</h2>
      <form className="goals-form" onSubmit={handleAddGoal} style={{ background: '#fff0fa', borderRadius: '1rem', boxShadow: '0 2px 8px #ffd6ef', padding: '1.5rem', marginBottom: '2rem', border: '2px solid #ffb6e6' }}>
        <input
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Goal title"
          required
          style={{ border: '1.5px solid #ffb6e6', borderRadius: '0.5rem', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Description"
          style={{ border: '1.5px solid #ffb6e6', borderRadius: '0.5rem', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleInput}
          style={{ border: '1.5px solid #ffb6e6', borderRadius: '0.5rem', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <button type="submit" disabled={adding} style={{ background: '#ffb6e6', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1.5rem', fontWeight: 'bold', boxShadow: '0 1px 4px #ffd6ef', cursor: 'pointer' }}>
          {adding ? 'Adding...' : 'Add Goal'}
        </button>
      </form>
      {loading ? (
        <div style={{ color: '#d72660' }}>Loading goals...</div>
      ) : error ? (
        <div className="goal-error" style={{ color: '#d72660', background: '#ffe0f0', border: '1.5px solid #ffb6e6', borderRadius: '0.5rem', padding: '0.5rem', marginBottom: '1rem' }}>Error: {error}</div>
      ) : (
        <ul className="goals-list" style={{ listStyle: 'none', padding: 0 }}>
          {goals.map(goal => (
            <li key={goal._id} className="goals-list-item" style={{ background: '#fff0fa', border: '1.5px solid #ffb6e6', borderRadius: '1rem', marginBottom: '1rem', padding: '1rem', boxShadow: '0 1px 4px #ffd6ef' }}>
              <div className="goal-title" style={{ color: '#d72660', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {goal.title} {goal.completed && <span className="goal-completed" style={{ color: '#ff69b4' }}>(Completed)</span>}
              </div>
              <div style={{ color: '#b03a7c' }}>{goal.description}</div>
              {goal.deadline && <div style={{ color: '#b03a7c' }}>Deadline: {new Date(goal.deadline).toLocaleDateString()}</div>}
              {!goal.completed && (
                <button className="goal-complete-btn" onClick={() => handleComplete(goal._id)} style={{ background: '#ffb6e6', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.3rem 1rem', fontWeight: 'bold', marginTop: '0.5rem', cursor: 'pointer' }}>
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
