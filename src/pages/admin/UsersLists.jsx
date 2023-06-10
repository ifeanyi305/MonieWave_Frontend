import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UsersLists = () => {
  const { progress, loading, failed } = useSelector((state) => state.userDetails);
  const [transferStatus, setTransferStatus] = useState('');
  const [beneficiaryStatus, setBeneficiaryStatus] = useState('');
  const user = progress?.user;
  const userTransfers = progress?.transfers;
  const userBeneficiaries = progress?.beneficiaries;
  
  const transferEmpty = () => {
    if (userTransfers?.length == 0) {
      setTransferStatus('No transfers have been made by this user')
    }
  }

  const beneficiaryEmpty = () => {
    if (userBeneficiaries?.length == 0) {
      setBeneficiaryStatus('No beneficiaries have been saved by this user')
    }
  }

  useEffect(() => {
    transferEmpty();
    beneficiaryEmpty();
  }, [userTransfers]);

  const formatTime = (timestamp) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  };

  const totalAmount = userTransfers?.reduce((total, transfer) => {
    return total + parseInt(transfer.amount);
  }, 0);

  return (
    <div className="px-6">
      {
        loading ? (<>loading...</>)
          : failed ? (<>An error occured</>)
            : user ? (
              <>
                <div className="my-[4%]">
                  <h1 className="text-[40px] text-[#464646]">{user?.first_name}&apos;s <span className="text-[#966BE9]">{user?.first_name} {user?.last_name}</span></h1>
                </div>
                <div className="flex flex-wrap mb-2 justify-between items-center w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
                  <div>
                    <p className="text-[16px] text-[#909090] font-[600]">Transaction Completed</p>
                    <small className="text-[#212121] text-[16px]">{userTransfers?.length}</small>
                  </div>
                  <div>
                    <p className="text-[16px] text-[#909090] font-[600]">Total amount sent</p>
                    <small className="text-[#212121] text-[16px]">{totalAmount}GPB</small>
                  </div>
                  <div>
                    <p className="text-[16px] text-[#909090] font-[600]">Active status</p>
                    <small className="text-[#212121] text-[16px]">{user?.status}</small>
                  </div>
                </div>
                <div className="my-6">
                  <h1 className="pb-4">{user?.first_name}&apos;s Information</h1>
                  <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
                    <div className="md:w-[50%]">
                      <div className="flex pb-4 justify-between items-center">
                        <p className="text-[16px] text-[#909090] font-[600]">Name of user</p>
                        <small className="text-[#212121] text-[16px]">{user?.first_name} {user?.last_name}</small>
                      </div>
                    </div>
                    <div className="md:w-[50%]">
                      <div className="flex pb-4 justify-between items-center">
                        <p className="text-[16px] text-[#909090] font-[600]">Email Address</p>
                        <small className="text-[#212121] text-[16px]">{user?.email}</small>
                      </div>
                    </div>
                    <div className="md:w-[50%]">
                      <div className="flex pb-4 justify-between items-center">
                        <p className="text-[16px] text-[#909090] font-[600]">Country</p>
                        <small className="text-[#212121] text-[16px]">{user?.country}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
              :  <>User empty</>
      }
      <div className="my-6">
        <h1 className="pb-4">{user?.first_name}&apos;s transactions</h1>
        {
          loading ? (<>Loading transfer...</>)
            : failed ? (<>An error occured while loading transfer</>)
              : userTransfers ? (
                userTransfers.map((transfer) => (
                  <div className="py-2">
                    <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
                      <div className="md:w-[50%]">
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Amount sent</p>
                          <small className="text-[#212121] text-[16px]">{transfer.amount} GBP</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Recipient name</p>
                          <small className="text-[#212121] text-[16px]">{transfer.recipient_name}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Recipient account</p>
                          <small className="text-[#212121] text-[16px]">{transfer.recipient_account}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Recipient bank</p>
                          <small className="text-[#212121] text-[16px]">{transfer.recipient_bank}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Recipient phone</p>
                          <small className="text-[#212121] text-[16px]">{transfer.recipient_phone}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Status</p>
                          <small className="text-[#212121] text-[16px]">{transfer.status}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Reference number</p>
                          <small className="text-[#212121] text-[16px]">{transfer.reference_number}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Day of Transaction</p>
                          <small className="text-[#212121] text-[16px]">{formatDate(transfer.created_at)}, {formatTime(transfer.created_at)}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
                : ''
        }
        <p>{transferStatus}</p>
      </div>
      <div className="my-6">
        <h1 className="pb-4">{user?.first_name}&apos;s Beneficiaries</h1>
        {
          loading ? (<>loading beneficiaries...</>)
            : failed ? (<>An error occured while loading beneficiaries</>)
              : userBeneficiaries ? (
                userBeneficiaries.map((beneficiary) => (
                  <div className="py-2">
                    <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
                      <div className="md:w-[50%]">
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Benficiary name</p>
                          <small className="text-[#212121] text-[16px]">{beneficiary.account_name}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Benficiary account</p>
                          <small className="text-[#212121] text-[16px]">{beneficiary.account_number}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Benficiary bank</p>
                          <small className="text-[#212121] text-[16px]">{beneficiary.bank_name}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Benficiary phone</p>
                          <small className="text-[#212121] text-[16px]">{beneficiary.phone_number}</small>
                        </div>
                        <div className="flex pb-4 justify-between items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Created at</p>
                          <small className="text-[#212121] text-[16px]">{formatDate(beneficiary.created_at)}, {formatTime(beneficiary.created_at)}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
                : ''
        }
        <p>{beneficiaryStatus}</p>
      </div>
      <div className="my-6">
        <h1 className="pb-4">Additional information</h1>
        {
          loading ? (<>loading...</>)
            : failed ? (<>An error occured</>)
              : user ? (
                <>
                  <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
                    <div className="md:w-[50%]">
                      <div className="flex pb-4 justify-between items-center">
                        <p className="text-[16px] text-[#909090] font-[600]">Date and time joined</p>
                        <small className="text-[#212121] text-[16px]">24th may 2023, 11pm</small>
                      </div>
                    </div>
                    <div className="md:w-[50%]">
                      <div className="flex pb-4 justify-between items-center">
                        <p className="text-[16px] text-[#909090] font-[600]">verified</p>
                        <small className="text-[#212121] text-[16px]">{user?.verified ? 'true' : 'false'}</small>
                      </div>
                    </div>
                    <div className="md:w-[50%]">
                      <div className="flex pb-4 justify-between items-center">
                        <p className="text-[16px] text-[#909090] font-[600]">Last login</p>
                        <small className="text-[#212121] text-[16px]">{formatDate(user?.last_login)}, {formatTime(user?.last_login)}</small>
                      </div>
                    </div>
                  </div>
                </>
              )
                : <>User empty</>
        }
      </div>
      <div className="md:w-[40%] m-auto">
        <button
          type="submit"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default UsersLists;