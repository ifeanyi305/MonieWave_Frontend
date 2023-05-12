import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div>
      <p>you Forget your password oya change am</p>
      <Link to='/ResetPassword'>ResetPassword</Link>
    </div>
  );
};

export default ForgotPassword;