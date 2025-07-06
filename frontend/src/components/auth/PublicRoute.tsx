import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/ui/loading-screen';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectAuthenticatedTo?: string;
}

// Helper function to get dashboard route based on role
const getDashboardRoute = (role: string): string => {
  switch (role) {
    case 'admin':
    case 'super_admin':
      return '/admin/dashboard';
    case 'instructor':
      return '/instructor/dashboard';
    case 'student':
      return '/student/dashboard';
    default:
      return '/dashboard';
  }
};

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectAuthenticatedTo,
}) => {
  const { isAuthenticated, isLoading, isVerifying, user } = useAuth();

  if (isLoading || isVerifying) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && user) {
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={redirectAuthenticatedTo || dashboardRoute} replace />;
  }

  return <>{children}</>;
};
