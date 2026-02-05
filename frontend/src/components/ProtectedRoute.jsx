import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Preserves the intended destination for redirect after login
 */
const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useContext(ShopContext);
  const location = useLocation();

  console.log('ProtectedRoute - authLoading:', authLoading, 'token:', !!token);

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // Check for token in state or localStorage - validate it's a real token
  const storedToken = localStorage.getItem('token');
  const authToken = token || storedToken;
  
  // Validate token is not empty, 'undefined' string, or 'null' string
  const hasValidToken = authToken && authToken !== 'undefined' && authToken !== 'null' && authToken.length > 10;
  
  console.log('ProtectedRoute - hasValidToken:', hasValidToken);

  if (!hasValidToken) {
    // Redirect to login, save the attempted URL for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
