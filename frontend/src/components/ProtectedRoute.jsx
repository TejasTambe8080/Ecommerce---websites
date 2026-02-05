import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

/**
 * ProtectedRoute Component
 * SIMPLE: Wait for authLoading, then check token exists
 */
const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useContext(ShopContext);
  const location = useLocation();

  // Wait for auth state to initialize
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // ONLY check if token exists in context state
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
