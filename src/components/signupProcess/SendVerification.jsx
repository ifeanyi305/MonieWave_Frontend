import React from 'react';

const SendVerification = ({ email, setEmail, sendVerication }) => {
  const validateEmail = () => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      return (<>Please enter a valid email address!</>)
    }
  }
  return (
    <div>
      <form onSubmit={sendVerication}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block" htmlFor="email">Email <span className="text-[#C50713] text-[17px]">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          className="p-4 block w-[560px] rounded-[8px] border-[#6B6B6B] border-[1px]"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={!validateEmail() ?
            'p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-[560px] text-center'
            : 'p-2 mt-[27px] opacity-40 mb-2 login_btn bg-[#814DE5] text-[#fff] w-[560px] text-center'}
          disabled={validateEmail()}
          type="submit"
          onClick={sendVerication}>
          send Verication code
        </button>
      </form>
    </div>
  );
};

export default SendVerification;