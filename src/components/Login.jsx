import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { signin, resetStateAndKeepFlash } from '../redux/auth/auth';
import { flash } from '../redux/flash/flash';
import Lady from '../assets/images/login/femaleLogin.png';
import RateHive from '../assets/images/navbar/RateHive.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { success, errors } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    }
    dispatch(signin(user))
  }

  if (success) {
    dispatch(resetStateAndKeepFlash());
    flash('success', 'Account logged in successfully')
    navigate('/userdashboard');
  } else if (errors) {
    flash('error', 'Invalid credentials')
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex w-[80%] m-auto bg-[#fff] mb-6 items-center gap-2">
        <div><img className="h-full w-full" src={Lady} alt="lady with a phone" /></div>
        <div className="w-full p-6">
          <h1 className="pb-[40px]"><a href='/broken'><img className="m-auto" src={RateHive} alt="title" /></a></h1>
          <div className="text-center pb-[40px]">
            <p className="text-[#212121] font-[600] text-[40px]">Welcome back</p>
            <p className="text-[16px]  text-[#212121] font-[400]">
              New to RateHive?
              <Link className="text-[#814DE5] text-[16px] font-[400]" to='/signup'>Sign up here</Link>
            </p>
          </div>
          <div className="flex justify-center">
            <div>
              <form onSubmit={submit}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="block" htmlFor="email">Your email address</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="block" htmlFor="email">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
              <button onClick={submit} type="submit" className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-[560px] text-center">
                log in
              </button>
              <Link className="text-[#814DE5] block" to='/ForgotPassword'>Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;