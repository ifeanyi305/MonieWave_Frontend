import React from 'react';

const SendVerification = ({email, setEmail, sendVerication}) => {
  // const [email, setEmail] = useState('');

  // const sendVerication = (event) => {
  //   event.preventDefault();
  //   fetch('http://127.0.0.1:3000/api/v1/otp/create_otp', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ user: { email } })
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  // }
  return (
    <div>
      <form onSubmit={sendVerication}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          className="form-control"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <button type="submit" onClick={sendVerication}>
        send Verication
      </button>
    </div>
  );
};

export default SendVerification;