import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getToken } from '../redux/auth/auth';
import Authentication from '../components/Authentication';
import checkbox from './dashboard/transferprocess/images/checkbox.png';
import RateHive from '../assets/images/navbar/RateHive.png';

const Redirect = () => {
  <Authentication />
  return (
    <div>
      <div className="p-4"><img src={RateHive} alt="Ratehive logo" /></div>
      <div className="flex justify-center px-6 mt-[10%]">
        <div>
          <div className="my-4"><img className="m-auto" src={checkbox} alt="check box" /></div>
          <h1 className="py-4 text-[24px] text-center font-extrabold">Your Ratehive account have been created successfully</h1>
          <p className="py-4 text-center">You can log back into your ratehive account using these details</p>
          <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[100%] md:w-[160px] text-center">
            <Link to='/'>Continue</Link>
          </button>
        </div>
      </div>
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
