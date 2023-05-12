import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div>
      <div className="flex flex-col justify-center">
        <h1 className="pb-[15px]">Forget your password?</h1>
        <p>If you are logged out of your RathHive account and can't remember your password</p>
        <p>we can send you an email with a link to reset your password</p>
        <Link to='/ResetPassword'>ResetPassword</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;