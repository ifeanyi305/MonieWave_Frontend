import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlinePending } from 'react-icons/md';
import { FcProcess } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import { TbClockCancel } from 'react-icons/tb';

const TransferStatus = () => {
  const location = useLocation();
  const transfer = location.state;
  function formatDate(date) {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options);
  }

  function formatTimestamp(timestamp) {
    const currentDate = new Date();
    const givenDate = new Date(timestamp);

    if (
      currentDate.getFullYear() === givenDate.getFullYear() &&
      currentDate.getMonth() === givenDate.getMonth() &&
      currentDate.getDate() === givenDate.getDate()
    ) {
      return `Today at ${formatDate(givenDate)}`;
    } else {
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);

      if (
        yesterday.getFullYear() === givenDate.getFullYear() &&
        yesterday.getMonth() === givenDate.getMonth() &&
        yesterday.getDate() === givenDate.getDate()
      ) {
        return `Yesterday at ${formatDate(givenDate)}`;
      } else {
        return givenDate.toLocaleString();
      }
    }
  }
  return (
    <div className="px-6">
      <div className="flex my-[4%] justify-between wrap items-start">
        <Link to="/transactions" className="text-[40px] cursor-pointer bg-[#F2EDFC] px-[5px] rounded-[50%]  text-[#464646]">&larr;</Link>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div>
        <p className="text-[#212121] text-[24px] font-[600]">Transaction status</p>
        <p className={
          transfer?.status == 'Pending' ?
            'text-[#F9B608]' :
            transfer?.status == 'Processing' ?
              'text-[#814DE5]' :
              transfer?.status == 'Completed' ?
                'text-[#37A13C]' :
                transfer?.status == 'Rejected' ?
                  'text-[#C50713]' :
                  'text-[#000]'
        }>{transfer?.status}</p>
      </div>
      <div className="py-6">
        <div className="flex mb-4 items-center gap-2">
          <AiOutlineCheckCircle className="text-[#37A13C]" />
          <div>
            <p>Transfer confirmation request sent</p>
            <p>{formatTimestamp(transfer?.created_at)}</p>
          </div>
        </div>
        <div className="flex mb-4 items-center gap-2">
          <div>
            {
              transfer?.status == 'Pending' ? (<MdOutlinePending className="text-[#F9B608]" />)
                : transfer?.status == 'Processing' ? (<FcProcess className="text-[#814DE5]" />)
                  : transfer?.status == 'Completed' ? (<AiOutlineCheckCircle className="text-[#37A13C]" />)
                    : transfer?.status == 'Rejected' ? (<GiCancel className="text-[#C50713]" />)
                      : (<TbClockCancel />)
            }
          </div>
          <div>
            <p>Transfer {transfer?.status}</p>
            <p>{formatTimestamp(transfer?.updated_at)}</p>
          </div>
        </div>
      </div>
      <div>
        <p>Recipient</p>
        <div className="border-[1px] border-[#D3D3D3] flex justify-between items-center mb-[5%] rounded-[24px] w-full p-6">
          <div>
            <p className="text-[#464646] pb-4 text-[20px] font-[500]">{transfer?.recipient_name}</p>
            <p className="text-[#464646] text-[14px] font-[400]">{transfer?.recipient_bank}</p>
          </div>
          <div>
            <p className="text-[#464646] pb-4 text-[20px] font-[600]">{transfer?.naira_amount}</p>
            <p className="text-[#814DE5] text-[14px] font-[400]">Download receipt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferStatus;