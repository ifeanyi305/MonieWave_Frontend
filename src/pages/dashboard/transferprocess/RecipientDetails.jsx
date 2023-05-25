import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrNotification } from 'react-icons/gr';
import Recipients from '../Recipients';
import { getBankCodes } from '../bankCodes/BankCodes';
import Select from 'react-select';

const RecipientDetails = ({ setNumber }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [toggleChecked, setToggleChecked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [randomCharacters, setRandomCharacters] = useState('');

  const handleBankChange = (selectedOption) => {
    setBankName(selectedOption ? selectedOption.value : '');
  };
  const options = getBankCodes.map((code) => ({
    value: code.code,
    label: `${code.bank_name}`
  }));
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: 'transparent',
      width: '100%',
      borderColor: '#6B6B6B',
      padding: '10px',
    })
  }
  const setDetails = (details) => {
    const existingDetails = localStorage.getItem('recipients');
    let recipients = existingDetails ? JSON.parse(existingDetails) : [];
    recipients.push(details);
    localStorage.setItem('recipients', JSON.stringify(recipients));
  }
  const fetchAccName = async () => {
    try {
      const res = await axios.get(`https://app.nuban.com.ng/api/NUBAN-JYBVNVCG1570?bank_code=${bankName}&acc_no=${accountNumber}`);
      const recipientName = res.data[0].account_name;
      setAccountName(recipientName);
      setLoading(false);
    } catch (error) {
      setError('An error occurred, type the Account number again');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (accountNumber.length == 10) {
      setError('');
      fetchAccName();
    }
  }, [accountNumber]);

  const submit = (e) => {
    e.preventDefault()
    if (bankName && accountNumber && phoneNumber && accountName) {
      const characters = generateRandomCharacters(6);
      setRandomCharacters(characters);
    }
    const recipientDtails = {
      bankName, accountNumber, accountName, phoneNumber
    }
    console.log(recipientDtails)
    setShowDetails(true);
    setToggleChecked(!toggleChecked);
    setDetails(recipientDtails);
  }

  const generateRandomCharacters = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

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
        <form onSubmit={submit}>
          <div>
            <label className="block">Bank Name</label>
            <Select
              value={options.find((option) => option.value === bankName)}
              onChange={handleBankChange}
              options={options}
              styles={customStyles}
            />
          </div>
          <div className="my-4">
            <label className="block">Account Number</label>
            <input
              value={accountNumber}
              type="number"
              className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block">Account Holder Name</label>
            <input
              type="text"
              value={loading ? 'loading Account name' : error ? error : accountName} readOnly
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="8012345678"
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              />
            </div>
          </div>
          <div className="flex my-2 justify-between items-center">
            <p className="text-[#814DE5]">Save this recipient</p>
            <div className="toggle">
              <input type="checkbox" checked={toggleChecked} onChange={submit} id="toggle-checkbox" />
              <label htmlFor="toggle-checkbox"></label>
            </div>
          </div>
          {randomCharacters && (
            <div className="my-4">
              Generated Random Characters: {randomCharacters}
            </div>
          )}
          <button
            type="button"
            className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
            onClick={() => setNumber(2)}>
            Continue
          </button>
        </form>
        {showDetails && (
          <Recipients bankName={bankName} accountNumber={accountNumber} />
        )}
      </div>
    </div>
  );
};

export default RecipientDetails;