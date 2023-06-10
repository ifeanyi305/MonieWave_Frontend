import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransferStatus } from '../../redux/moneyTransfer/updateTransfer';

const TransactDetails = () => {
  const [status, setStatus] = useState('');
  const { updated, loading, error } = useSelector((state) => state.updateTransfer);
  const { progress } = useSelector((state) => state.showTransfer);
  const transfer = progress?.transfer;
  const dispatch = useDispatch();

  const handleStatusUpdate = () => {
    if (status !== '') {
      dispatch(
        updateTransferStatus({
          data: {
            id: transfer?.id,
            status: status,
          },
        })
      );
    }
  };

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

  return (
    <div className="px-6">
      <div className="my-[4%]">
        <h1 className="text-[40px] text-[#464646]">Transactions details: {transfer?.id}</h1>
      </div>
      <div className="flex flex-wrap mb-2 justify-between items-center w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
        <div>
          <p className="text-[16px] text-[#909090] font-[600]">Date & time of the transaction</p>
          <small className="text-[#212121] text-[16px]">{formatDate(transfer?.created_at)} at {formatTime(transfer?.created_at)}</small>
        </div>
        <div>
          <p className="text-[16px] text-[#909090] font-[600]">Transaction status</p>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <p className="text-[16px] text-[#909090] font-[600]">Transaction note</p>
          <small className="text-[#212121] text-[16px]">nothing yet</small>
        </div>
      </div>
      <div className="my-6">
        <h1 className="pb-4">Transaction information</h1>
        <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Name of user</p>
              <small className="text-[#212121] text-[16px]">{transfer?.first_name}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Amount sent(Euro/Pounds)</p>
              <small className="text-[#212121] text-[16px]">{transfer?.amount} {transfer?.currency}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Exchange rate</p>
              <small className="text-[#212121] text-[16px]">{transfer?.exchange_rate}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Payment mathod</p>
              <small className="text-[#212121] text-[16px]">{transfer?.payment_method}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Transaction ID</p>
              <small className="text-[#212121] text-[16px]">{transfer?.id}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Reference number</p>
              <small className="text-[#212121] text-[16px]">{transfer?.reference_number}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h1 className="pb-4">Recipient details</h1>
        <div className="w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Name of Recipient</p>
              <small className="text-[#212121] text-[16px]">{transfer?.recipient_name}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Amount in naira</p>
              <small className="text-[#212121] text-[16px]">{transfer?.naira_amount}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Bank name</p>
              <small className="text-[#212121] text-[16px]">{transfer?.recipient_bank}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Account number</p>
              <small className="text-[#212121] text-[16px]">{transfer?.recipient_account}</small>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="flex pb-4 justify-between items-center">
              <p className="text-[16px] text-[#909090] font-[600]">Phone number</p>
              <small className="text-[#212121] text-[16px]">{transfer?.recipient_phone}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[40%] m-auto">
        <button
          onClick={() => handleStatusUpdate()}
          type="submit"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
        >
          {
            loading ? 'updating...' : updated ? 'status updated' : error ? 'update error' : 'confirm'
          }
        </button>
      </div>
    </div>
  );
};

export default TransactDetails;