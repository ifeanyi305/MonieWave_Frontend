import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { signin, resetStateAndKeepFlash } from '../redux/auth/auth';
import { flash } from '../redux/flash/flash';
import Lady from '../assets/images/login/femaleLogin.png';
import RateHive from '../assets/images/navbar/RateHive.png';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../assets/images/loading/loading-icon.gif';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const user = {
      user: {
        email,
        password,
      }
    }
    dispatch(signin(user)).then((res) => {
      if (res.error) {
        flash('error', res.payload);
        setLoginError(true);
      } else {
        dispatch(resetStateAndKeepFlash());
        flash('success', 'Account logged in successfully');
        navigate('/');
        window.location.reload();
      }
    })
  }

  return (
    <div className="px-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex w-[80%] m-auto bg-[#fff] mb-6 items-center gap-2">
        <div><img className="h-full hidden md:block w-full" src={Lady} alt="lady with a phone" /></div>
        <div className="w-full p-6">
          <Link to="/"><h1 className="pb-[40px]"><img className="m-auto" src={RateHive} alt="title" /></h1></Link>
          <div className="text-center pb-[40px]">
            <p className="text-[#212121] font-[600] text-[40px]">Welcome back</p>
            <p className="text-[16px]  text-[#212121] font-[400]">
              New to MonieWave?
              <Link className="text-[#814DE5] text-[16px] font-[400]" to='/signup'> Sign up here</Link>
            </p>
          </div>
          <div className="">
            <div>
              <form onSubmit={submit}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="block" htmlFor="email">Your email address <span className="text-[#C50713] text-[17px]">*</span></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  className="p-4 block w-full rounded-[8px] border-[#6B6B6B] border-[1px]"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="block" htmlFor="password">Password <span className="text-[#C50713] text-[17px]">*</span></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  className="p-4 block w-full rounded-[8px] border-[#6B6B6B] border-[1px]"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={submit} type="submit" className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center">
                  {
                    loading ? (<img src={Loading} className="w-[25px] m-auto" alt="loading" />) : (<>login</>)
                  }
                </button>
              </form>
              <Link className="text-[#814DE5] block" to='/ForgotPassword'>Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;