import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/auth/auth';
import Authentication from '../components/Authentication';
import { signout } from '../redux/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { GrNotification } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const Redirect = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
    navigate('/login');
  };


  <Authentication />
  return (
    <div className="p-6">
      <div className="flex mb-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#212121]">Hi Flourish</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="py-4">Make Transfers</p>
        <div className="send_btn bg-[#000] p-6">
          <div className="pb-4">
            <p className="text-[#FAFAFA] text-[28px] heading_text">Bank transfer or card?</p>
            <p className="text-[#FAFAFA] text-[28px] heading_text">We've got you covered</p>
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
              <Link to='/send_money'>Send money</Link>
            </button>
          </div>
        </div>
      </div>
      <div>
        <p>Today's exchange rates</p>
      </div>
      {/* <button
        type="button"
        onClick={handleLogout}
      > Logout
      </button> */}
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
