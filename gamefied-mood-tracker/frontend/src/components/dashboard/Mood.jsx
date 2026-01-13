import React, { useState } from 'react';
import { useUser } from '../../context/UserContext.jsx';
import { addMood } from '../../api/mood.api.jsx';
import '../../styles/components/dashboard/Mood.css';

const MOODS = [
  { value: 'very_bad', emoji: '😢', label: 'Very Bad' },
  { value: 'bad', emoji: '😕', label: 'Bad' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'very_good', emoji: '😄', label: 'Very Good' },
];

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [logged, setLogged] = useState(false);
  const { user, setUser } = useUser();


  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setLogged(false);
  };

  const handleLogMood = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;
    try {
      const res = await addMood(selectedMood, note);
      // Update UserContext with new XP, coins, and streak
      if (res && res.xp !== undefined && res.coins !== undefined && res.streak !== undefined) {
        setUser(prev => ({
          ...prev,
          xp: res.xp,
          coins: res.coins,
          streak: res.streak,
        }));
      }
      setLogged(true);
    } catch (err) {
      // handle error if needed
    }
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
