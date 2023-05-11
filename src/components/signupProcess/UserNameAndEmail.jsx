import React from 'react';
import { Link } from 'react-router-dom';

const UserNameAndEmail = (
  {submit, first_name, setFirstname, last_name, setLastname, setNumber }
  ) => {
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={first_name}
          className="form-control"
          placeholder="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="_username">Firstname</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={last_name}
          className="form-control"
          placeholder="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="_username">Lastname</label>
        {/* <form onSubmit={sendVerication}>
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
        </button> */}
        {/* <form onSubmit={verifyotp}>
          <input
            type="number"
            id="test"
            name="text"
            value={otp}
            className="form-control"
            placeholder="otp"
            onChange={(e) => setOtp(e.target.value)}
          />
        </form>
        <button type="submit" onClick={verifyotp}>
          Verify otp
        </button> */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="email">Email</label>
        <input
          type="text"
          id="country"
          name="country"
          value={country}
          className="form-control"
          placeholder="country"
          onChange={(e) => setCountry(e.target.value)}
        /> */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="email">Country</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className="form-control"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="email">Password</label> */}
        {/* <input
          type="checkbox"
          id="verified"
          name="verified"
          value={verified}
          className="form-control"
          placeholder="verified"
          onChange={handleChange}
        /> */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="email">verified</label>
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          className="form-control"
          placeholder="role"
          onChange={(e) => setRole(e.target.value)}
        /> */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="email">Role</label> */}
      </form>
      <button onClick={() => setNumber(1)}>next</button>
      {/* <button type="submit" onClick={submit}>
        Submit
      </button> */}
      <p>already have an account? <Link to='/login'>Log in here</Link></p>
    </div>
  );
};

export default UserNameAndEmail;