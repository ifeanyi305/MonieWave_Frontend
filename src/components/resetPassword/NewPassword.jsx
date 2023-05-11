import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetStateAndKeepFlash } from '../../redux/auth/auth';
import { flash } from '../../redux/flash/flash';

const NewPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { success, errors } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
// ifyjapan
  const submit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return (<>password do not match</>)
    }
    const passwordReset = {
      password,
      token,
      email
    }
    dispatch(resetPassword(passwordReset))
  }

  if (success) {
    dispatch(resetStateAndKeepFlash());
    flash('success', 'password reset successfully')
    navigate('/login');
  } else if (errors) {
    flash('error', 'An error occured')
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const userToken = searchParams.get("token")
    const userEmail = searchParams.get("email")
    setEmail(userEmail);
    setToken(userToken);
    console.log(userToken)
    console.log(userEmail)
  },[location])

  return (
    <div>
      <form onSubmit={submit}>
        <input
         className='bg-[#000] text-[#fff] py-2 block'
         type="password"
         value={password}
         placeholder="password"
         onChange={(e) => setPassword(e.target.value)}
        />
        <input
         className='bg-[#000] text-[#fff] py-2 block'
         type="password"
         value={confirmPassword}
         placeholder="confirm password"
         onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button type="submit">Change password</button>
      </form>
    </div>
  );
};

export default NewPassword;