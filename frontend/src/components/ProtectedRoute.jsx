import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useContext(ShopContext);
  const location = useLocation();

  // ⛔ DO NOT REDIRECT UNTIL AUTH IS READY
  if (authLoading) {
    return null; // or spinner
  }

  // ✅ SINGLE SOURCE OF TRUTH
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
