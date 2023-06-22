import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../redux/auth/auth';
import Navbar from '../dashboard/Navbar';
import AdminSidebar from '../dashboard/AdminSidebar';

const AdminRoutes = ({ handleSidebar, sidebar }) => {
  const isAuthenticated = getToken();
  if (!isAuthenticated || isAuthenticated.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <section className='flex gap-6'>
        <AdminSidebar sidebar={sidebar} handleSidebar={handleSidebar} />
        <div className="md:ml-[20%] w-full">
          <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AdminRoutes;