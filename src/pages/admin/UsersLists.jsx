import React from 'react';

const UsersLists = () => {
  return (
    <div className="px-6">
      <div className="my-[4%]">
        <h1 className="text-[40px] text-[#464646]">User's details: <span className="text-[#966BE9]">Flourish Ralph</span></h1>
      </div>
      <div className="flex flex-wrap mb-2 justify-between items-center w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
        <div>
          <p className="text-[16px] text-[#909090] font-[600]">Transaction Completed</p>
          <small className="text-[#212121] text-[16px]">25</small>
        </div>
        <div>
          <p className="text-[16px] text-[#909090] font-[600]">Total amount sent</p>
          <small className="text-[#212121] text-[16px]">304,596GPD</small>
        </div>
        <div>
          <p className="text-[16px] text-[#909090] font-[600]">Active status</p>
          <small className="text-[#212121] text-[16px]">nothing yet</small>
        </div>
      </div>
      <div className="my-6">
        <h1 className="pb-4">User information</h1>
        <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Name of user</p>
              <small className="text-[#212121] text-[16px]">Flourish ralph</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Email Address</p>
              <small className="text-[#212121] text-[16px]">flow333@gmail.com</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Country</p>
              <small className="text-[#212121] text-[16px]">United kingdom</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Phone number</p>
              <small className="text-[#212121] text-[16px]">+44 5879586859</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Date of birth</p>
              <small className="text-[#212121] text-[16px]">28th January</small>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h1 className="pb-4">Additional information</h1>
        <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Date and time joined</p>
              <small className="text-[#212121] text-[16px]">24th may 2023, 11pm</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">verified</p>
              <small className="text-[#212121] text-[16px]">true</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Last login</p>
              <small className="text-[#212121] text-[16px]">24th may 2023, 11pm</small>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[40%] m-auto">
        <button
          type="submit"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default UsersLists;