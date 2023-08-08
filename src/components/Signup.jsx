import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { signup, resetStateAndKeepFlash } from '../redux/auth/auth';
import Password from './signupProcess/Password';
import SendVerification from './signupProcess/SendVerification';
import UserCountry from './signupProcess/UserCountry';
import UserNameAndEmail from './signupProcess/UserNameAndEmail';
import Otp from './signupProcess/VerifyOtp';
import { flash } from '../redux/flash/flash';
import Man from '../assets/images/login/man.png';
import RateHive from '../assets/images/navbar/RateHive.png';

const Signup = ({ role, setRole }) => {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verified, setVerification] = useState(false);
  const [number, setNumber] = useState(0);
  const { success, coming } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      flash('error','password do not match')
      return;
    }
    const user = {
      first_name, last_name, email, country,
      password, verified, role
    }
    dispatch(signup(user))
  }

  useEffect(() => {
    if (success && number == 4) {
      dispatch(resetStateAndKeepFlash());
      flash('success', 'Account created successfully')
      navigate('/SignupSuccesful');
    }
  }, [success])

  const sendVerication = (event) => {
    event.preventDefault();
    fetch('https://ratehive.onrender.com/api/v1/otp/create_otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { email } })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    setNumber(3)
  }

  const currentForm = () => {
    switch (number) {
      case 0:
        return <UserNameAndEmail
          submit={submit}
          first_name={first_name}
          setFirstname={setFirstname}
          last_name={last_name}
          setLastname={setLastname}
          setNumber={setNumber}
        />
      case 1:
        return <UserCountry
          setNumber={setNumber}
          country={country}
          setCountry={setCountry}
        />
      case 2:
        return <SendVerification
          setNumber={setNumber}
          sendVerication={sendVerication}
          email={email}
          setEmail={setEmail}
        />
      case 3:
        return <Otp
          otp={otp}
          setVerification={setVerification}
          sendVerication={sendVerication}
          setNumber={setNumber}
          email={email}
          setOtp={setOtp} />
      case 4:
        return <Password
          setConfirmPassword={setConfirmPassword}
          confirmPassword={confirmPassword}
          password={password}
          setNumber={setNumber}
          submit={submit}
          setPassword={setPassword}
          coming={coming}
        />
      default:
        return <UserNameAndEmail
          submit={submit}
          first_name={first_name}
          setFirstname={setFirstname}
          last_name={last_name}
          setLastname={setLastname}
          setNumber={setNumber}
        />
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex w-[80%] m-auto bg-[#fff] mb-6 items-center gap-2">
        <div>
          <img className="h-full hidden md:block w-full" src={Man} alt="man folding hands" />
        </div>
        <div className="w-full p-6">
          <h1 className="pb-[40px]"><img className="m-auto" src={RateHive} alt="title" /></h1>
          <div className="text-center pb-[40px]">
            <p className="text-[#212121] font-[600] text-[40px]">Create your MonieWave account</p>
            <p className="text-[16px]  text-[#212121] font-[400]">
              Already have an account?
              <Link className="text-[#814DE5] text-[16px] font-[400]" to='/login'> Log in here</Link>
            </p>
          </div>
          <div className="">{currentForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;