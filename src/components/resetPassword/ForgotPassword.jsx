import React from 'react';
import { Link } from 'react-router-dom';
import Ratehive from '../../assets/images/navbar/RateHive.png';

const ForgotPassword = () => {
  return (
    <div>
      <div><h1><img  className="pb-[5%] px-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center">
        <div>
          <h1 className="pb-[15px] text-[40px] text-center">Forgot your password?</h1>
          <p>If you are logged out of your RathHive account and can't remember your password</p>
          <p>we can send you an email with a link to reset your password</p>
          <div className="mt-[5%] flex justify-center">
            <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[80%] text-center">
              <Link to='/ResetPassword'>Reset Password</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
