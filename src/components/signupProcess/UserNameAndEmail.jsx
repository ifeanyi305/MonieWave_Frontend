import React from 'react';

const UserNameAndEmail = (
  { submit, first_name, setFirstname, last_name, setLastname, setNumber }
) => {
  const validateForm = () => {
    return first_name.trim() !== '' && last_name.trim() !== '';
  }
  return (
    <div>
      <form onSubmit={submit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block" htmlFor="_username">Firstname <span className="text-[#C50713] text-[17px]">*</span></label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={first_name}
          className="p-4 block w-full rounded-[8px] border-[#6B6B6B] border-[1px]"
          placeholder="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block" htmlFor="_username">Lastname <span className="text-[#C50713] text-[17px]">*</span></label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={last_name}
          className="p-4 block w-full rounded-[8px] border-[#6B6B6B] border-[1px]"
          placeholder="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <button
          className={validateForm() ?
            'p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'
            : 'p-2 mt-[27px] opacity-40 mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'}
          disabled={!validateForm()} onClick={() => setNumber(1)}>
          next
        </button>
      </form>
    </div>
  );
};

export default UserNameAndEmail;