import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  }
  return (
    <div>
      <h1>Reset Password</h1>
      <p>Enter the email wey you carry register</p>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={handleInputChange} />
        <button type="submit">send</button>
        {/* <Link to='/ResetPasswordLinkSent'></Link> */}
      </form>
    </div>
  );
};

export default ResetPassword;