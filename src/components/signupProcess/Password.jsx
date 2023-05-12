import React from 'react';
import Loading from '../../assets/images/loading/loading-icon.gif';

const Password = ({ password, submit, setPassword, confirmPassword, setConfirmPassword, coming }) => {
  return (
    <div>
      <form onSubmit={submit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block" htmlFor="confirm_password">Confirm your Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]"
          placeholder="confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* <button
          type="submit"
          onClick={() => (submit)}
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-[560px] text-center"
        >
          sign up
        </button> */}
        <button type="submit" className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-[560px] text-center">
          {
            coming ? (<img src={Loading} className="w-[25px] m-auto" alt="loading" />) : (<> sign up</>)
          }
        </button>
      </form>
    </div>
  );
};

export default Password;