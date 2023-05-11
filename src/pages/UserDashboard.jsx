import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../redux/auth/auth';
import Authentication from '../components/Authentication';

const Redirect = () => {
  <Authentication />
  return (
    <div>
      User Dashboard
    </div>
  );
};

export default function UserDashboard() {
  const isAuthenticated = getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Redirect />;
}
