import React from 'react';
import { GrNotification } from 'react-icons/gr';

const RecipientDetails = ({ setNumber }) => {
  return (
    <div className="px-6">
      <div className="flex my-[4%] justify-between wrap items-start">
        <h1 onClick={() => setNumber(0)} className="text-[40px] cursor-pointer bg-[#F2EDFC] px-[5px] rounded-[50%]  text-[#464646]">&larr;</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div>
        <p className="text-[#212121] text-[24px] font-[600]">Recipient's Details</p>
        <p>Enter the Recipient details correctly</p>
      </div>
      <div className="py-6 md:w-[45%]">
        <div>
          <label className="block">Bank Name</label>
          <input
            type="text"
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
        </div>
        <div className="my-4">
          <label className="block">Account Number</label>
          <input
            type="number"
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
        </div>
        <div>
          <label className="block">Confirm Account Number</label>
          <input
            type="number"
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
        </div>
        <div className="my-4">
          <label className="block">Account Holder Name</label>
          <input
            type="text"
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
        </div>
        <div>
          <label className="block">Recipient Phone Number</label>
          <div className="flex gap-4 items-center">
            <select className="block border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]" name="number" id="number">
              <option value="+234">+234</option>
            </select>
            <input
              type="number"
              placeholder="8012345678"
              className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
        </div>
        <div className="flex my-2 justify-between items-center">
          <p className="text-[#814DE5]">Save this recipient</p>
          <div class="toggle">
            <input type="checkbox" id="toggle-checkbox" />
              <label for="toggle-checkbox"></label>
          </div>
        </div>
        <button
          type="button"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
          onClick={() => setNumber(2)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default RecipientDetails;