import React from 'react';
import { GrNotification } from 'react-icons/gr';
import checkbox from './images/checkbox.png'

const MoneySent = ({ setNumber, confirmTransfer }) => {
  return (
    <div className="px-6">
      <div className="flex mt-[4%] justify-between wrap items-start">
        <h1 onClick={() => setNumber(2)} className="text-[40px] cursor-pointer bg-[#F2EDFC] px-[5px] rounded-[50%]  text-[#464646]">&larr;</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div className="w-[100%] md:w-[45%] m-auto">
        <div className="mb-6"><img className="m-auto" src={checkbox} alt="checkbox" /></div>
        <div>
          <h1 className="text-[#212121] text-center font-semibold text-[24px]">Transaction Confirmation</h1>
          <small>If you have made the payment into our bank account, kindly confirm the transaction.</small>
        </div>
        <div className="mt-6">
          <p className="text-[#212121] text-[24px]">
            Once your transaction has been verified,
            we will immediately send the Naira equivalent
            to your recipient.
          </p>
        </div>
        <button
          type="button"
          onClick={confirmTransfer}
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
        >
          Confirm Transaction
        </button>
      </div>
    </div>
  );
};

export default MoneySent;