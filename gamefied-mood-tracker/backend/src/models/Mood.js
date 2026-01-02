import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    },
    mood: {
      type: String,
      required: [true, 'Mood is required'],
      enum: {
        values: ['very_bad', 'bad', 'neutral', 'good', 'very_good'],
        message: '{VALUE} is not a valid mood'
      }
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Note cannot exceed 500 characters'],
      default: ''
    },
    // Store date without time for uniqueness check
    moodDate: {
      type: Date,
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound index to ensure one mood per day per user
moodSchema.index({ userId: 1, moodDate: 1 }, { unique: true });

// Index for efficient queries
moodSchema.index({ userId: 1, createdAt: -1 });

// Pre-save middleware to set moodDate (date only, no time)
moodSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('createdAt')) {
    // Set moodDate to start of day (00:00:00) in UTC
    const date = this.createdAt || new Date();
    this.moodDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  next();
});

// Virtual for mood value (numeric representation)
moodSchema.virtual('moodValue').get(function () {
  const moodValues = {
    very_bad: 1,
    bad: 2,
    neutral: 3,
    good: 4,
    very_good: 5
  };
  return moodValues[this.mood] || 3;
});

// Virtual for mood label
moodSchema.virtual('moodLabel').get(function () {
  const moodLabels = {
    very_bad: 'Very Bad',
    bad: 'Bad',
    neutral: 'Neutral',
    good: 'Good',
    very_good: 'Very Good'
  };
  return moodLabels[this.mood] || 'Neutral';
});

// Virtual for mood emoji
moodSchema.virtual('moodEmoji').get(function () {
  const moodEmojis = {
    very_bad: '😢',
    bad: '😕',
    neutral: '😐',
    good: '🙂',
    very_good: '😄'
  };
  return moodEmojis[this.mood] || '😐';
});

// Static method to check if mood exists for user on date
moodSchema.statics.findMoodForDate = async function (userId, date) {
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return await this.findOne({
    userId,
    moodDate: startOfDay
  });
};

// Static method to get mood stats for user
moodSchema.statics.getUserMoodStats = async function (userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const moods = await this.find({
    userId,
    createdAt: { $gte: startDate }
  }).sort({ createdAt: -1 });

  const moodCounts = {
    very_bad: 0,
    bad: 0,
    neutral: 0,
    good: 0,
    very_good: 0
  };

  let totalMoodValue = 0;

  moods.forEach(mood => {
    moodCounts[mood.mood]++;
    totalMoodValue += mood.moodValue;
  });

  const averageMood = moods.length > 0 ? (totalMoodValue / moods.length).toFixed(2) : 0;

  return {
    totalEntries: moods.length,
    moodCounts,
    averageMood,
    moods
  };
};

// Static method to get mood streak
moodSchema.statics.getMoodStreak = async function (userId) {
  const moods = await this.find({ userId })
    .sort({ moodDate: -1 })
    .select('moodDate');

  if (moods.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < moods.length; i++) {
    const moodDate = new Date(moods[i].moodDate);
    moodDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (moodDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Instance method to get XP reward based on mood
moodSchema.methods.getXPReward = function () {
  const baseXP = 10;
  const moodMultipliers = {
    very_bad: 1.0,  // 10 XP
    bad: 1.0,       // 10 XP
    neutral: 1.0,   // 10 XP
    good: 1.2,      // 12 XP
    very_good: 1.5  // 15 XP
  };

  return Math.floor(baseXP * (moodMultipliers[this.mood] || 1.0));
};

// Instance method to get coin reward
moodSchema.methods.getCoinReward = function () {
  return 5; // Base coin reward for logging mood
};

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;