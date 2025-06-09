import { useState } from 'react';
import '../styles/mood.css'


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


function Mood(){
    const [text,changeText] = useState(''); 
    const [date,changeDate] = useState('');
    const [choosenMood,changechoosenMood] = useState('');
    const [showEntry,setshowEntry] = useState(false);
    function handleChange(e){
        changeText(e.target.value);

    }
    
    function handleMoodSelect(mood){
        changechoosenMood(mood.label);
        setshowEntry(true );
    }
    function handleSave(){
        if(text.trimEnd()=='') return;
        const entry = {entry : text,
                        date : new Date()}
        //save to storage
        localStorage.setItem('journal',JSON.stringify(entry));
        //
        setshowEntry(false);
        setTimeout(()=>changeText(''),200);
    }
    return(
         
        <div className={`mood-tracker`}>
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