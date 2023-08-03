import React, { useState, useEffect } from 'react';
import { GrNotification } from 'react-icons/gr';
import { CgDanger } from 'react-icons/cg';
import { FiCopy } from 'react-icons/fi'
import { AiOutlineCheck } from 'react-icons/ai'
import { getToken } from '../../../redux/auth/auth';

const BankDetails = ({ setNumber, reference_number, amount, fee, currency }) => {
  const [currentColor, setCurrentColor] = useState('red');

  useEffect(() => {
    const colors = ['red', 'blue', '#a52a2a', '#4b2aa5', '#4b2aa5', '#807300'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setCurrentColor(colors[currentIndex]);
      currentIndex = (currentIndex + 1) % colors.length;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const userDetails = getToken();
  const token = userDetails?.username;

  const CopyButton = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = (textToCopy) => {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 5000);
        })
        .catch((error) => {
          setCopySuccess(false);
        });
    };

    return (
      <div>
        <button
          type="button"
          onClick={() => handleCopy(text)}
          className={copySuccess ? 'text-[#008000]' : 'text-[#000]'}
        >
          {copySuccess ? (<p className='flex items-center gap-[3px]'>
            <AiOutlineCheck /> copied
          </p>) : (<p className='flex items-center gap-[3px]'>
            <FiCopy />
          </p>)}
        </button>
      </div >
    );
  };

  return (
    <div className="px-6">
      <div className="flex my-[4%] justify-between wrap items-center">
        <h1 onClick={() => setNumber(1)} className="text-[40px] cursor-pointer bg-[#F2EDFC] px-[5px] rounded-[50%]  text-[#464646]">&larr;</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>{token}</p>
        </div>
      </div>
      <div>
        <p className="text-[#212121] text-[24px] font-[600]">Our Bank Account Details</p>
        <p>Make the payment into our bank account and we&apos;ll send the Naira equivalent to your recipient.</p>
      </div>
      <div className="py-6 md:w-[50%]">
        <div className="">
          <div>
            <div className="md:flex md:justify-between md:items-center md:gap-4">
              <p className="font-[900] text-[24px]">Account Name:</p>
              <div className="flex items-center gap-2">
                <CopyButton text="RateHive Transfers" />
                <p className="text-[20px]">RateHive Transfers</p>
              </div>
            </div>
            <div className="md:flex md:justify-between my-2 md:items-center md:gap-4">
              <p className="font-[900] text-[24px]">IBAN:</p>
              <div className="flex items-center gap-2">
                <CopyButton text="NL48 BUNQ 2038 5197 73" />
                <p className="text-[20px]">NL48 BUNQ 2038 5197 73</p>
              </div>
            </div>
            <div className="md:flex md:justify-between md:items-center md:gap-4">
              <p className="font-[900] text-[24px]">BIC:</p>
              <div className="flex items-center gap-2">
                <CopyButton text="BUNQNL2AXXX" />
                <p className="text-[20px]">BUNQNL2AXXX</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-10 justify-between items-center">
          <div>
            <p className="text-[15px]">Transaction Fee</p>
            <p className="text-[15px]">Total Amount to be sent</p>
          </div>
          <div>
            <p className="font-[900] text-[15px]">{fee} {currency}</p>
            <p className="font-[900] text-[15px]">{parseInt(amount) + fee} {currency}</p>
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
            <div className="flex items-center gap-2">
              <CopyButton text={reference_number} />
              <b style={{ color: currentColor }} className="text-[25px] font-extrabold">{reference_number}</b>
            </div>
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