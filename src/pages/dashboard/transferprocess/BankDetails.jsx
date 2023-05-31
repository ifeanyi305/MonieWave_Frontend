import React from 'react';
import { GrNotification } from 'react-icons/gr';
import { CgDanger } from 'react-icons/cg';

const BankDetails = ({ setNumber }) => {
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
        <p className="text-[#212121] text-[24px] font-[600]">Our Bank Account Details</p>
        <p>Make the payment into our bank account and we&apos;ll send the Naira equivalent to your recipient.</p>
      </div>
      <div className="py-6 md:w-[50%]">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-[900] text-[24px]">Account Name:</p>
            <p className="font-[900] text-[24px]">IBAN:</p>
            <p className="font-[900] text-[24px]">BIC:</p>
          </div>
          <div>
            <p className="text-[24px]">RateHive Transfers</p>
            <p className="text-[24px]">NL48BUNQ2038**</p>
            <p className="text-[24px]">BUNQNCXXXXX</p>
          </div>
        </div>
        <div className="flex my-10 justify-between items-center">
          <div>
            <p className="text-[15px]">Transaction Fee</p>
            <p className="text-[15px]">Total Amount to be sent</p>
          </div>
          <div>
            <p className="font-[900] text-[15px]">1 GBP</p>
            <p className="font-[900] text-[15px]">142637 GBP</p>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[15px]">Reference Code</p>
            <small className="flex gap-2 items-center">
              <CgDanger className="text-[#C50713] text-[22px]" />
              Enter this code as your transaction
              reference when making the bank transfer.
              Do not share with anyone.
            </small>
          </div>
          <div>
            <p className="font-[900] text-[15px]"></p>
          </div>
        </div>
        <button
          type="button"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
          onClick={() => setNumber(3)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default BankDetails;