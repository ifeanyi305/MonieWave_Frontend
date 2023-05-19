import React from 'react';
import { GrNotification } from 'react-icons/gr';
import exchange from './images/exchange.png'

const TransferMoney = ({ setNumber }) => {
  return (
    <div className="px-6">
      <div className="flex my-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#212121]">Send Money</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div>
        <p className="text-[28px]">Currency Conversion</p>
        <p className="">Your currency is being converted to naira</p>
      </div>
      <div className="py-6 md:w-[45%]">
        <div>
          <label className="block">you send</label>
          <input
            type="number"
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
        </div>
        <div className="my-6">
          <img src={exchange} className="m-auto" alt="exchange" />
        </div>
        <div>
          <label className="block">Osadebanem Ralph recieves exactly</label>
          <input
            type="number"
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
          <label className="block py-2">total amount: 50696GPD</label>
        </div>
        <div className="flex my-4 justify-between items-center">
          <p>Our fee</p>
          <p>1GPD</p>
        </div>
        <button
          type="button"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
          onClick={() => setNumber(1)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferMoney;