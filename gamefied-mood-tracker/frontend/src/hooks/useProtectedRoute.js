import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const useProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
};

export default useProtectedRoute;
