import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../redux/auth/auth';

const PublicRoutes = () => {
  const isAuthenticated = getToken();
  if (isAuthenticated && (isAuthenticated.role === 'admin' || isAuthenticated.role === 'customer')) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoutes;