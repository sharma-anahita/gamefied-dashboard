// src/context/UserContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api/user.api.jsx';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setError(err.message);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    error,
    refetchUser: fetchUser,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
};