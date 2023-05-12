import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../redux/flash/flash';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:3000/api/v1/password/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => {
      if (response.ok) {
        flash('success', 'Email sent successfully');
        navigate('/ResetPasswordLinkSent');
      } else {
        throw new Error('Request failed');
      }
    })
      .catch(error => {
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
      <h1>Reset Password</h1>
      <p>Enter the email wey you carry register</p>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={handleInputChange} />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default ResetPassword;