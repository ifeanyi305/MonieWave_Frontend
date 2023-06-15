import React from 'react';
import html2pdf from 'html2pdf.js';
import { renderToString } from 'react-dom/server';
import { useLocation, Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlinePending } from 'react-icons/md';
import { FcProcess } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import { TbClockCancel } from 'react-icons/tb';
import Ratehive from '../../assets/images/navbar/RateHive.png';

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

  const transferDetails = [
    {
      title: "Transaction Date",
      detail: formatTimestamp(transfer?.created_at),
    },
    {
      title: "Transaction Type",
      detail: transfer?.payment_method,
    },
    {
      title: "Amount",
      detail: transfer?.naira_amount,
    },
    {
      title: "Exchange Rate",
      detail: <p>{transfer?.exchange_rate} {transfer?.currency}</p>,
    },
    {
      title: "Recipient Name",
      detail: transfer?.recipient_name,
    },
    {
      title: "Recipient Account Number",
      detail: transfer?.recipient_account,
    },
    {
      title: "Bank",
      detail: transfer?.recipient_bank,
    },
    {
      title: "Recipient Number",
      detail: transfer?.reference_number,
    },
  ];

  const Receipt = () => (
    <div>
      <div className="w-full">
        <div className="my-4"><img src={Ratehive} alt="Ratehive_logo" /></div>
        <p className="text-[#212121] my-4 font-extrabold text-[18px]">Transaction Receipt</p>
        <div className="my-4 md:w-[65%] w-full bg-[#F7F7F7] p-4 rounded-[20px]">
          {transferDetails.map((transaction) => (
            <div className="flex items-center py-2 gap-4" key={transaction.id}>
              <p className="text-[#464646] font-extrabold text-[16px]">{transaction.title}:</p>
              <p className="text-[#464646] font-[500] text-[14px]">{transaction.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  const handleDownload = () => {
    const receiptElement = document.createElement('div');
    receiptElement.innerHTML = renderToString(<Receipt />);
    const opt = {
      margin: 1,
      filename: 'transaction_receipt.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(receiptElement).set(opt).save();
  };

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
            <button className={transfer?.status === 'Completed' ? 'block' : 'hidden'} type="button" onClick={() => handleDownload()}>
              <p className="text-[#814DE5] text-[14px] font-[400]">Download receipt</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferStatus;