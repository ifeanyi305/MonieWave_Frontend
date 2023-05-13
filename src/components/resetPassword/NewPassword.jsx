import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetStateAndKeepFlash } from '../../redux/auth/auth';
import { flash } from '../../redux/flash/flash';
import Ratehive from '../../assets/images/navbar/RateHive.png';

const NewPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { success, errors } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert('password do not match')
      return;
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
  },[location])

  return (
    <div>
      <div><h1><img  className="pb-[5%] px-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center">
        <form onSubmit={submit}>
          <h1 className="pb-[15px] text-[40px] text-center">Create new Password</h1>
          <input
          className="p-4 block w-[560px] my-2 rounded-[8px] border-[#6B6B6B] border-[1px]"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          />
          <input
          className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]"
          type="password"
          value={confirmPassword}
          placeholder="confirm password"
          onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <div className="mt-[5%] flex justify-center">
            <button type="submit" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[80%] text-center">
            Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;