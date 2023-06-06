import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getToken } from '../redux/auth/auth';
import Authentication from '../components/Authentication';

const Redirect = () => {
  <Authentication />
  return (
    <div>
      Signup Succesful
      <Link to='/'>Continue</Link>
    </div>
  );
};

export default function SignupSuccesful() {
  const isAuthenticated = getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Redirect />;
}
