import React from 'react';

const Password = ({ password, submit, setPassword }) => {
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className="form-control"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="email">Password</label>
        <button type="submit" onClick={ () => (submit)}>
          sign up
        </button>
      </form>
    </div>
  );
};

export default Password;