import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

/**
 * Wraps a route so that unauthenticated users are redirected to /login.
 */
export default function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
