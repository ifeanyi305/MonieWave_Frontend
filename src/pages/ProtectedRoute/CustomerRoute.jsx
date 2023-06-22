import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../redux/auth/auth';
import Navbar from '../dashboard/Navbar';
import Sidebar from '../dashboard/Sidebar';

const CustomerRoute = ({ handleSidebar, sidebar }) => {
  const isAuthenticated = getToken();
  if (!isAuthenticated || isAuthenticated.role !== 'customer') {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <section className='flex gap-6'>
        <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} />
        <div className="md:ml-[20%] w-full">
          <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default CustomerRoute;