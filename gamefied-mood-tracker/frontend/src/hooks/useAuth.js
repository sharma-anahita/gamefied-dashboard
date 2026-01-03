import { useState, useCallback } from 'react';

function getToken() {
  return localStorage.getItem('token');
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
