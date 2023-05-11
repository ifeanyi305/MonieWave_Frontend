import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { signup, resetStateAndKeepFlash, verifyOtp } from '../redux/auth/auth';
import Password from './signupProcess/Password';
import SendVerification from './signupProcess/SendVerification';
import UserCountry from './signupProcess/UserCountry';
import UserNameAndEmail from './signupProcess/UserNameAndEmail';
import Otp from './signupProcess/VerifyOtp';
import { flash } from '../redux/flash/flash';
import { Routes, Route } from 'react-router-dom';

const Signup = () => {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerification] = useState(false);
  const [role, setRole] = useState('customer');
  const [number, setNumber] = useState(0);
  const { success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name, last_name, email, country,
      password, verified, role
    }
    dispatch(signup(user))
    // if (success) {
    //   dispatch(resetStateAndKeepFlash());
    //   flash('success', 'Account created successfully')
    //   navigate('/SignupSuccesful');
    // }
  }

  useEffect(() => {
    if (success && number == 4) {
      dispatch(resetStateAndKeepFlash());
      flash('success', 'Account created successfully')
      navigate('/SignupSuccesful');
    }
  },[success])

  const sendVerication = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:3000/api/v1/otp/create_otp', {
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
        return <UserCountry setNumber={setNumber} country={country} setCountry={setCountry} />
      case 2:
        return <SendVerification setNumber={setNumber} sendVerication={sendVerication} email={email} setEmail={setEmail} />
      case 3:
        return <Otp otp={otp} setNumber={setNumber} email={email} setOtp={setOtp} />
      case 4:
        return <Password password={password} setNumber={setNumber} submit={submit} setPassword={setPassword} />
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
      <p>login</p>
      <>
        {currentForm()}
      </>
    </div>
  );
};

export default Signup;