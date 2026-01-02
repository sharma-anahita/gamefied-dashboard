import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },
    xp: {
      type: Number,
      default: 0,
      min: [0, 'XP cannot be negative']
    },
    level: {
      type: Number,
      default: 1,
      min: [1, 'Level cannot be less than 1']
    },
    coins: {
      type: Number,
      default: 0,
      min: [0, 'Coins cannot be negative']
    },
    streak: {
      type: Number,
      default: 0,
      min: [0, 'Streak cannot be negative']
    },
    lastMoodDate: {
      type: Date,
      default: null
    },
    uiPreferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'dark'
      },
      notifications: {
        type: Boolean,
        default: true
      },
      language: {
        type: String,
        default: 'en'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return ;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for progress to next level (can be calculated based on XP)
userSchema.virtual('progressToNextLevel').get(function () {
  const baseXP = 100;
  const currentLevelXP = baseXP * (this.level - 1);
  const nextLevelXP = baseXP * this.level;
  const xpInCurrentLevel = this.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  
  return {
    current: xpInCurrentLevel,
    needed: xpNeededForLevel,
    percentage: Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100)
  };
});

userSchema.index({ xp: -1 }); // For leaderboards

const User = mongoose.model('User', userSchema);

export default User;