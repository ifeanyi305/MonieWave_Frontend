import React from 'react';
import { GrNotification } from 'react-icons/gr';

const PaymentMethod = ({ setNumber }) => {
  return (
    <div className="px-6">
      <div className="flex my-[4%] justify-between wrap items-start">
        <h1 onClick={() => setNumber(1)} className="text-[40px] cursor-pointer bg-[#F2EDFC] px-[5px] rounded-[50%]  text-[#464646]">&larr;</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div>
        <p className="text-[#212121] text-[24px] font-[600]">Payment Method</p>
        <p>Choose your preffered payment method</p>
      </div>
    </div>
  );
};

export default PaymentMethod;