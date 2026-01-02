const getRewardMessage = (charCount) => {
    if (charCount >= 500) {
      return "🏆 Master Storyteller! 500+ characters - you're on fire!";
    } else if (charCount >= 300) {
      return "⭐ Great Writer! 300+ characters of awesome thoughts!";
    } else if (charCount >= 150) {
      return "🎯 Nice Entry! 150+ characters - keep it flowing!";
    } else if (charCount >= 50) {
      return "💭 Good Start! 50+ characters - every word counts!";
    } else if (charCount >= 10) {
      return "✨ Nice Touch! Even short entries matter!";
    } else {
      return "👍 Saved! Every thought is valuable!";
    }
  };

export default getRewardMessage;