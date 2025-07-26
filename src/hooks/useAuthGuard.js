// src/hooks/useAuthGuard.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthGuard = (requiredRole) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== requiredRole) {
      navigate('/'); 
    }
  }, [requiredRole, navigate]);
};
