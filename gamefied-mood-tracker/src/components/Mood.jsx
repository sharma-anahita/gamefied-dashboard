import { useState } from 'react';
import '../styles/mood.css'
import getRewardMessage from '../utils/reward.js'
import RewardMessage from './Rewardmessage.jsx'
import {calculateXPFromChars,calculateLevel,getXPForCurrentLevel} from '../utils/xpManagement.js'
import MOCK_USER from '../utils/user.js';

const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '💪', label: 'Motivated' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '🎉', label: 'Excited' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '🤔', label: 'Thoughtful' }
  ];


function Mood({user,setUser}){
    const [text,changeText] = useState(''); 
    const [date,changeDate] = useState('');
    const [choosenMood,changechoosenMood] = useState('');
    const [showEntry,setshowEntry] = useState(false);
    const [showReward, setShowReward] = useState(false);
    const [rewardMessage, setRewardMessage] = useState('');


    function handleChange(e){
        changeText(e.target.value);

    }
    
    function handleMoodSelect(mood){
        changechoosenMood(mood.label);
        setshowEntry(true );
    }
    function handleSave() {
    if (text.trim() === '') return;
    
    const trimmedText = text.trim();
    const charCount = trimmedText.length;
    const message = getRewardMessage(charCount);

    setRewardMessage(message);
    setShowReward(true);

    const entry = {
        entry: trimmedText,
        date: new Date(),
        mood: choosenMood
    };

    localStorage.setItem('journal', JSON.stringify(entry));

    let addedXp = calculateXPFromChars(charCount);
    const finalXp = user.xp + addedXp;
    const newLevel = calculateLevel(finalXp);

    setshowEntry(false);
    setTimeout(() => changeText(''), 200);
    
    // Update user with new total XP and level
    setUser({
        ...user,
        xp: finalXp,  // Keep total accumulated XP
        level: newLevel
    });
}



    const handleCloseReward = () => {
        setShowReward(false);
    };
    return(
         
        <div className={`mood-tracker`}>
            <RewardMessage show={showReward} message={rewardMessage} onClose={handleCloseReward}/>
            <div className='mood-grid'>
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        className={`mood-button ${choosenMood.emoji === mood.emoji ? 'selected' : ''}`}
                        onClick={() => handleMoodSelect(mood)} >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-label">{mood.label}</span>
                    </button>
                    ))}
            </div>
                <>
                <div className={`journal-entry ${showEntry ? 'show' : ''}`}>
                    <h2 className='mood-title'>How are you feeling today?</h2>
                    <textarea type="textarea"  onChange={handleChange} value={text} rows="4" cols="40" className='journal'  />
                    <button className='save-button' onClick={()=>handleSave()}>Save</button>
                </div>
                </>
                
                
            
            
        </div>
        
    );
}

export default Mood;