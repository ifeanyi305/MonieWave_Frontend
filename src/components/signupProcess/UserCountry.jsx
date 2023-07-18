import React from 'react';

const UserCountry = ({ country, setCountry, setNumber }) => {
  const validateCountry = () => {
    return country.trim() !== '';
  }
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="block" htmlFor="country">Country <span className="text-[#C50713] text-[17px]">*</span></label>
      <input
        type="text"
        id="country"
        name="country"
        value={country}
        className="p-4 block w-full rounded-[8px] border-[#6B6B6B] border-[1px]"
        placeholder="country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <button
        className={validateCountry() ?
          'p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'
          : 'p-2 mt-[27px] opacity-40 mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'}
        disabled={!validateCountry()}
        onClick={() => setNumber(2)}>
        next
      </button>
    </div>
  );
};

export default UserCountry;