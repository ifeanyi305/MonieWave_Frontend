import React from 'react';
import Ratehive from '../../assets/images/navbar/RateHive.png';
import Mail from '../../assets/images/login/mail.png';

const ResetPasswordLinkSent = () => {

  return (
    <div>
      <div><h1><img  className="pb-[5%] px-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center">
        <div>
          <img className="py-6 m-auto" src={Mail} alt="mail box" />
          <h1 className="pb-[15px] text-[40px] text-center">Reset Password </h1>
          <p className="text-center">We've sent you an email, use the link to reset your password</p>
          <p className="text-center">If you don’t get the email soon, check your spam folder.</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordLinkSent;
