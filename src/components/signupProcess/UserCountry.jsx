import React from 'react';
import { Link } from 'react-router-dom';

const UserCountry = ({ country, setCountry, setNumber }) => {
  return (
    <div>
      <input
        type="text"
        id="country"
        name="country"
        value={country}
        className="form-control"
        placeholder="country"
        onChange={(e) => setCountry(e.target.value)}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email">Country</label>
      <button onClick={() => setNumber(2)}>next</button>
    </div>
  );
};

export default UserCountry;