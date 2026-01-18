# 🎮 Gamified Mood Tracker Dashboard

A full-stack **gamified productivity and wellness dashboard** that allows users to log daily moods, set and complete goals, earn XP and coins, track streaks, and view progress — all wrapped in a clean, scalable architecture.

This project is designed with **real-world frontend–backend separation**, authentication, and extensibility in mind.

---

## 🚀 Features

### ✅ Authentication
- User login & registration
- JWT-based authentication
- Protected routes for authenticated users
- Persistent login using `/auth/me`

### 😊 Mood Tracking
- Log one mood per day
- Mood validation and streak tracking
- XP and coin rewards for logging moods
- Backend-enforced daily uniqueness
- Mood history and weekly stats support

### 🎯 Goals System
- Create goals with optional deadlines
- Validate deadlines (future-only)
- Mark goals as completed
- Automatic refresh of user stats on completion
- Backend-connected CRUD flow

### 🧠 Gamification
- XP accumulation
- Level calculation (based on XP thresholds)
- Coins system (used for store / rewards)
- Streaks maintained in backend and synced to frontend

### 🧭 Navigation & Layout
- Sidebar-based navigation (Dashboard, Goals, Friends, Store, etc.)
- Shared protected layout across all authenticated pages
- Login/Register pages without navigation clutter

### 👥 Friends (Placeholder)
- Friends page scaffolded
- UI ready for future backend integration
- Empty state handling implemented

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Context API (UserContext)
- Fetch API
- CSS Modules / Custom Styling

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

---

## 📁 Project Structure

```text
gamefied-mood-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── routes/
│   │   └── styles/
│   └── main.jsx
│
└── README.md
