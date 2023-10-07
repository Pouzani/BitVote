import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/**
 * The `ProtectedRoute` component checks if the user is authenticated and redirects to the login page
 * if not, otherwise it renders the child routes.
 * @returns The ProtectedRoute component is returning either a Navigate component to redirect to the
 * login page if the user is not authenticated, or an Outlet component to render the child routes if
 * the user is authenticated.
 */
export const ProtectedRoute = () => {
    const { accessToken } = useAuth();
  
    // Check if the user is authenticated
    if (!accessToken) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
  };