import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransfers } from '../../redux/moneyTransfer/allTransfers';
import { showUserTransfer } from '../../redux/moneyTransfer/showTransfer';
import LoadingGif from './images/loading-icon.gif';

const UsersTransaction = () => {
  const { success, loading, error } = useSelector((state) => state.getAllTransfers);
  const { progress, pending } = useSelector((state) => state.showTransfer);
  const transfers = success?.success?.transfers;
  const [showButtonArray, setShowButtonArray] = useState(Array(transfers?.length).fill(false));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllTransfers());
  }, [dispatch]);

  const viewButton = (index) => {
    setShowButtonArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const transferDetails = (id) => {
    dispatch(showUserTransfer(id))
    if (progress) {
      navigate('/transact_details')
    }
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
      <div className="flex flex-wrap my-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#464646]">Transactions</h1>
        <div className="flex items-center gap-2 border-[1px] border-[#909090] rounded-[8px] px-[24px]">
          <AiOutlineSearch />
          <input
            type="search"
            className="border-none py-[12px] focus:outline-none"
            placeholder="search"
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <p><b className="font-[600] text-[24px] text-[#212121]">Pending</b></p>
      </div>
      <div className="py-4">
        <div className="border-[1px] tranfers p-2 border-[#909090] rounded-[24px]">
          <table className="w-full p-4 bg-[#fff]">
            <thead>
              <tr>
                <th className="py-6 px-4 text-[#909090] text-[13px]">Name of User</th>
                <th className="py-6 px-4 text-[#909090] text-[13px]">Date and time of transactions</th>
                <th className="py-6 px-4 text-[#909090] text-[13px]">Amount sent(Euro/Pounds)</th>
                <th className="py-6 px-4 text-[#909090] text-[13px]">Transaction ID</th>
                <th className="py-6 px-4 text-[#909090] text-[13px]">Transaction status</th>
              </tr>
            </thead>
            <tbody>
              {
                loading ? (<>loading transaction details...</>)
                  : error ? (<>error details</>)
                    : transfers ? (
                      transfers.map((transfer, index) => (
                        <tr key={index}>
                          <td className="text-center text-[12px] py-4">{transfer.first_name}</td>
                          <td className="text-center text-[12px]">{formatDate(transfer.created_at)}</td>
                          <td className="text-center text-[12px]">{transfer.amount} {transfer.currency}</td>
                          <td className="text-center text-[12px]">{transfer.id}</td>
                          <td className={
                            transfer?.status == 'Pending' ?
                              'text-[#F9B608] text-center text-[12px]' :
                              transfer?.status == 'Processing' ?
                                'text-[#814DE5] text-center text-[12px]' :
                                transfer?.status == 'Completed' ?
                                  'text-[#37A13C] text-center text-[12px]' :
                                  transfer?.status == 'Rejected' ?
                                    'text-[#C50713] text-center text-[12px]' :
                                    'text-[#000] text-center text-[12px]'
                          }>{transfer.status}</td>
                          <td className="text-center text-[12px]">
                            <button
                              className={!showButtonArray[index] ? 'hidden' : 'block text-[12px]'}
                              type="button"
                              onClick={() => transferDetails(transfer.id)}
                            >{pending ? (<img src={LoadingGif} alt="loading_gif" />) : 'view details'}</button>
                          </td>
                          <td className="text-center"><button type="button" onClick={() => viewButton(index)}>...</button></td>
                        </tr>
                      ))
                    ) : <>details empty</>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTransaction;