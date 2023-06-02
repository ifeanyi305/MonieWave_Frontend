import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipients } from '../../redux/recipients/recipients';
import { Link } from 'react-router-dom';

const Recipients = () => {
  const { success, loading, error } = useSelector((state) => state.beneficiary);
  const [searchQuery, setSearchQuery] = useState('');
  const recipients = success?.success;
  const dispatch = useDispatch();
  console.log("I'm loading", loading);
  console.log("I'm success", recipients);
  console.log("I'm error", error);
  useEffect(() => {
    dispatch(fetchRecipients());
  }, [dispatch]);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="px-6">
      <div className="flex flex-wrap my-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#464646]">Recipients</h1>
        <input
          type="search"
          className="rounded-[8px] border-[1px] border-[#909090] py-[12px] px-[24px]"
          placeholder="search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="flex items-center justify-between py-4">
        <p><b className="font-[600] text-[24px] text-[#212121]">Manage your recipients</b></p>
        <p><b className="font-[600] underline text-[20px] text-[#814DE5]">Add</b></p>
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
                  <button type="button" className="bg-transparent recipient_button border-[#C50713] border-[1px] login_btn py-[10px] text-center text-[#C50713] px-[24px]">
                    Delete recipient
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (<p>No recipients available</p>)
      }
    </div>
  );
};

export default Recipients;