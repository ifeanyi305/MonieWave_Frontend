import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/auth/auth';
import Authentication from '../components/Authentication';
import { signout, cleanFlash } from '../redux/auth/auth';
import { useDispatch, useSelector } from 'react-redux';

const Redirect = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
    dispatch(cleanFlash());
    navigate('/login');
  }

  <Authentication />
  return (
    <div>
      User Dashboard
      <button
        type="button"
        onClick={handleLogout}
      > Logout
      </button>
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
