import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveRecipients } from '../../../redux/recipients/recipients';
import { useDispatch, useSelector } from 'react-redux';
import { GrNotification } from 'react-icons/gr';
import { getBankCodes } from '../bankCodes/BankCodes';
import Select from 'react-select';
import { getToken } from '../../../redux/auth/auth';
import loadingGiphy from '../../admin/images/loading-icon.gif';

const RecipientDetails = ({
  setNumber, recipient_name, setRecipient_name, recipient_account,
  setRecipient_account, recipient_bank, setRecipient_bank, recipient_phone,
  setRecipient_phone, setReference_number
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [bank_code, setBank_code] = useState('')
  const [pending, setPending] = useState(true);
  const [error, setError] = useState('');
  const { successful, loading } = useSelector((state) => state.beneficiary);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const userDetails = getToken();
  const token = userDetails?.username;

  const validateForm = () => {
    return  pending !== true &&
    error !== 'An error occurred, type the Account number again' &&
     recipient_account.length !== 0 &&
     recipient_phone.length !== 0 &&
     recipient_bank.length !== 0
  };

  const handleBankChange = (selectedOption) => {
    setRecipient_bank(selectedOption ? selectedOption.label : '');
    setBank_code(selectedOption ? selectedOption.value : '');
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
      const res = await axios.get(`https://app.nuban.com.ng/api/NUBAN-JYBVNVCG1570?bank_code=${bank_code}&acc_no=${recipient_account}`);
      const recipientName = res.data[0].account_name;
      setRecipient_name(recipientName);
      setPending(false);
    } catch (error) {
      setError('An error occurred, type the Account number again');
      setPending(false);
    }
  };
  useEffect(() => {
    if (recipient_account.length == 10) {
      setError('');
      fetchAccName();
    }
  }, [recipient_account]);

  const submit = (e) => {
    e.preventDefault()
    if (recipient_bank && recipient_account && recipient_phone && recipient_name) {
      const characters = generateRandomCharacters(6);
      setReference_number(characters);
    }
    if (isChecked) {
      const beneficiaryDetails = {
        bank_name: recipient_bank,
        account_number: recipient_account,
        account_name: recipient_name,
        phone_number: recipient_phone
      }
      console.log("beneficiary saved successfully")
      dispatch(saveRecipients(beneficiaryDetails))
    } else {
      console.log("not saved, an error occured")
    }
    const recipientDtails = {
      recipient_bank, recipient_account, recipient_name, recipient_phone
    }
    setDetails(recipientDtails);
    setNumber(2)
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
          <p>{token}</p>
        </div>
      </div>
      <div>
        <p className="text-[#212121] text-[24px] font-[600]">Recipient's Details</p>
        <p>Enter the Recipient details correctly</p>
      </div>
      <div className="py-6 md:w-[45%]">
        <form onSubmit={submit}>
          <div>
            <label className="block">Bank Name <span className="text-[#C50713] text-[17px]">*</span></label>
            <Select
              value={options.find((option) => option.value === recipient_bank)}
              onChange={handleBankChange}
              options={options}
              styles={customStyles}
            />
          </div>
          <div className="my-4">
            <label className="block">Account Number <span className="text-[#C50713] text-[17px]">*</span></label>
            <input
              value={recipient_account}
              type="number"
              className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              onChange={(e) => setRecipient_account(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block">Account Holder Name <span className="text-[#C50713] text-[17px]">*</span></label>
            <input
              type="text"
              value={pending ? 'loading Account name...' : error ? error : recipient_name} readOnly
              className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
          <div>
            <label className="block">Recipient Phone Number <span className="text-[#C50713] text-[17px]">*</span></label>
            <div className="flex gap-4 items-center">
              <select className="block border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]" name="number" id="number">
                <option value="+234">+234</option>
              </select>
              <input
                type="number"
                value={recipient_phone}
                onChange={(e) => setRecipient_phone(e.target.value)}
                placeholder="8012345678"
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              />
            </div>
          </div>
          <div className="flex my-2 justify-between items-center">
            <p className="text-[#814DE5]">Save this recipient</p>
            <div className="toggle">
              <input type="checkbox" checked={isChecked} onChange={handleToggle} id="toggle-checkbox" />
              <label htmlFor="toggle-checkbox"></label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!validateForm()}
            className={validateForm() ?
              'p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'
              : 'p-2 mt-[27px] opacity-40 mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'}
          >
            {loading ? 'loading' : 'continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipientDetails;