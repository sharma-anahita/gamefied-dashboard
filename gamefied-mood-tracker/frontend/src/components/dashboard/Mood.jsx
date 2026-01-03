import React, { useState } from 'react';
import '../../styles/components/dashboard/Mood.css';

const MOODS = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'sad', emoji: '😔', label: 'Sad' },
  { value: 'angry', emoji: '😡', label: 'Angry' },
];

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [logged, setLogged] = useState(false);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setLogged(false);
  };

  const handleLogMood = (e) => {
    e.preventDefault();
    if (!selectedMood) return;
    setLogged(true);
    // Future: send to backend
  };

  return (
    <div className="mood-card">
      <h3 className="mood-title">Log Your Mood</h3>
      <form className="mood-form" onSubmit={handleLogMood}>
        <div className="mood-selector">
          {MOODS.map(mood => (
            <button
              key={mood.value}
              type="button"
              className={`mood-emoji${selectedMood === mood.value ? ' mood-emoji--selected' : ''}`}
              onClick={() => handleMoodSelect(mood.value)}
              aria-label={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
        <input
          className="mood-note"
          type="text"
          placeholder="Add a short note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
          maxLength={60}
        />
        <button
          className="mood-log-btn"
          type="submit"
          disabled={!selectedMood}
        >
          Log Mood
        </button>
        {logged && (
          <div className="mood-logged-msg">Mood logged! 🎉</div>
        )}
      </form>
    </div>
  );
};

export default Mood;
