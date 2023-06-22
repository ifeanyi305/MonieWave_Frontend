import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../redux/flash/flash';
import Ratehive from '../../assets/images/navbar/RateHive.png';
import Loading from '../../assets/images/loading/loading-icon.gif';


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch('http://127.0.0.1:3000/api/v1/password/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => {
        setLoading(false);
        if (response.ok) {
          flash('success', 'Email sent successfully');
          navigate('/ResetPasswordLinkSent');
        } else {
          throw new Error('Request failed');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error)
        flash('error', 'Email address not found')
      });
  }

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  }
  return (
    <div>
      <ToastContainer />
      <div><h1><img className="pb-[5%] px-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center">
        <div>
          <h1 className="pb-[15px] text-[40px] text-center">Reset Password</h1>
          <p className="text-center">Enter the email address you used to create your RateHive account and</p>
          <p className="text-center">we will send you a link to reset your password.</p>
          <form className="py-[8%]" onSubmit={handleSubmit}>
            <label className="block">Enter your email address <span className="text-[#C50713] text-[17px]">*</span></label>
            <input type="email" className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]" value={email} onChange={handleInputChange} />
            <div className="mt-[5%] flex justify-center">
              <button type="submit" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[80%] text-center">
                {
                  loading ? (<img src={Loading} className="w-[25px] m-auto" alt="loading" />) : (<>send password reset link</>)
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
