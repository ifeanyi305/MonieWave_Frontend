import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipients } from '../../redux/recipients/recipients';
import { saveRecipients } from '../../redux/recipients/recipients';
import { deleteRecipients } from '../../redux/recipients/recipients';
import { getBankCodes } from './bankCodes/BankCodes';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const Recipients = ({
  recipient_name, setRecipient_name, recipient_bank, setRecipient_bank,
  recipient_account, setRecipient_account, recipient_phone, setRecipient_phone
}) => {
  const { success, loading, error } = useSelector((state) => state.beneficiary);
  console.log("raw",success);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipientModal, setRecipientModal] = useState(false);
  const [bank_code, setBank_code] = useState('')
  const [pending, setPending] = useState(true);
  const [failed, setFailed] = useState('');
  const recipients = success?.success;
  console.log("configured",recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipients());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const addRecipients = () => {
    setRecipientModal(!recipientModal);
  }

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

  const fetchAccName = async () => {
    try {
      const res = await axios.get(`https://app.nuban.com.ng/api/NUBAN-JYBVNVCG1570?bank_code=${bank_code}&acc_no=${recipient_account}`);
      const recipientName = res.data[0].account_name;
      setRecipient_name(recipientName);
      setPending(false);
    } catch (error) {
      setFailed('An error occurred, type the Account number again');
      setPending(false);
    }
  };

  useEffect(() => {
    if (recipient_account.length == 10) {
      setFailed('');
      fetchAccName();
    }
  }, [recipient_account]);

  const submit = (e) => {
    e.preventDefault()
    const beneficiaryDetails = {
      bank_name: recipient_bank,
      account_number: recipient_account,
      account_name: recipient_name,
      phone_number: recipient_phone
    }
    console.log("beneficiary saved successfully")
    dispatch(saveRecipients(beneficiaryDetails));
    window.location.reload();
  }

  const removeRecipients = (id) => {
    dispatch(deleteRecipients(id))
    if (success) {
      dispatch(fetchRecipients())
    }
  };

  return (
    <div>
      <div className={!recipientModal ? 'hidden' : 'block w-full h-full p-6 fixed top-0 bg-[#000000ca]'}>
        <div className='bg-[#fff] rounded-[24px] recipientModal md:w-[40%] p-6 absolute md:top-[10%] top-[15%] md:left-[20%]'>
          <div className="flex mb-[5%] items-center justify-between">
            <p className="text-[#212121] text-[20px] font-extrabold">Manage your recipients</p>
            <button type="button" onClick={addRecipients} className="text-[25px]">&times;</button>
          </div>
          <form onSubmit={submit}>
            <div>
              <label className="block">Bank Name</label>
              <Select
                value={options.find((option) => option.value === recipient_bank)}
                onChange={handleBankChange}
                options={options}
                styles={customStyles}
              />
            </div>
            <div className="my-4">
              <label className="block">Account Number</label>
              <input
                value={recipient_account}
                type="number"
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                onChange={(e) => setRecipient_account(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="block">Account Holder Name</label>
              <input
                type="text"
                value={pending ? 'loading Account name' : failed ? failed : recipient_name} readOnly
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
                  value={recipient_phone}
                  onChange={(e) => setRecipient_phone(e.target.value)}
                  placeholder="8012345678"
                  className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
            >
              {loading ? 'loading' : 'continue'}
            </button>
          </form>
        </div>
      </div>
      <div className="px-6">
        <div className="flex flex-wrap my-[4%] justify-between wrap items-center">
          <h1 className="text-[40px] text-[#464646]">Recipients</h1>
          <div className="flex items-center gap-2 border-[1px] border-[#909090] rounded-[8px] px-[24px]">
            <AiOutlineSearch />
            <input
              type="search"
              className="border-none py-[12px] focus:outline-none"
              placeholder="search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <p><b className="font-[600] text-[24px] text-[#212121]">Manage your recipients</b></p>
          <button type="button" onClick={addRecipients}>
            <p><b className="font-[600] underline text-[20px] text-[#814DE5]">Add</b></p>
          </button>
        </div>
        {
          loading ? (<p>loading...</p>) : error ? (<p>An error occured</p>) : recipients ? (
            recipients.filter((recipient) =>
              recipient.account_name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((recipient) => (
              <div className="border-[1px] border-[#D3D3D3] mb-[5%] rounded-[24px] w-full p-6" key={recipient.id}>
                <div className="md:flex recipient_details mb-[8%] md:items-center justify-between">
                  <div className="recipient_account_details">
                    <p className="text-[#909090] text-[16px]">Account holder name:</p>
                    <p><b className="text-[#212121] text-[20px] font-[600]">{recipient.account_name}</b></p>
                  </div>
                  <div className="recipient_account_details">
                    <p className="text-[#909090] text-[16px]">Account number:</p>
                    <p><b className="text-[#212121] text-[20px] font-[600]">{recipient.account_number}</b></p>
                  </div>
                  <div className="recipient_account_details">
                    <p className="text-[#909090] text-[16px]">Bank name:</p>
                    <p><b className="text-[#212121] text-[20px] font-[600]">{recipient.bank_name}</b></p>
                  </div>
                </div>
                <hr className="mb-6" />
                <div className="md:flex items-center justify-between">
                  <div>
                    <button type="button" className="bg-[#814DE5] recipient_button login_btn border-none py-[10px] text-center text-[#fff] px-[24px]">
                      <Link to="/send_money">Send money</Link>
                    </button>
                  </div>
                  <div className="delete_recipient">
                    <button onClick={() => removeRecipients(recipient.id)} type="button" className="bg-transparent recipient_button border-[#C50713] border-[1px] login_btn py-[10px] text-center text-[#C50713] px-[24px]">
                      {loading ? 'loading' : 'Delete recipient'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (<p>No recipients available</p>)
        }
      </div>
    </div>
  );
};

export default Recipients;