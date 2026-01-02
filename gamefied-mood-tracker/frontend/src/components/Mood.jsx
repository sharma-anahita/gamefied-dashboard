// src/components/dashboard/Mood.jsx

import { useState } from 'react';
import { addMood } from '../../api/mood.api.js';
import '../../styles/components/Mood.css';

const MOOD_OPTIONS = [
  { value: 'very_bad', emoji: '😢', label: 'Very Bad' },
  { value: 'bad', emoji: '😕', label: 'Bad' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'very_good', emoji: '😄', label: 'Very Good' },
];

const Mood = ({ onMoodAdded }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMood) {
      setError('Please select a mood');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await addMood(selectedMood, note);
      setSuccess(`Mood logged! +${response.xp} XP, Streak: ${response.streak}`);
      setSelectedMood('');
      setNote('');
      
      // Trigger parent refetch
      if (onMoodAdded) {
        onMoodAdded();
      }
    } catch (err) {
      setError(err.message || 'Failed to log mood');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-container">
      <h2 className="mood-title">How are you feeling today?</h2>

      {error && <div className="mood-error">{error}</div>}
      {success && <div className="mood-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mood-selector">
          {MOOD_OPTIONS.map((mood) => (
            <div
              key={mood.value}
              className={`mood-option ${selectedMood === mood.value ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </div>
          ))}
        </div>

        <div className="mood-note-group">
          <label className="mood-note-label">Note (optional)</label>
          <textarea
            className="mood-note-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mood-submit-button"
        >
          {loading ? 'Logging...' : 'Log Mood'}
        </button>
      </form>
    </div>
  );
};

export default Mood;