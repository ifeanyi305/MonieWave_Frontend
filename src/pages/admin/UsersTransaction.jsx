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
      {
        loading ? (<>loading transaction details...</>)
          : error ? (<>error details</>)
            : transfers ? (
              transfers.map((transfer, index) => (
                <div className="py-4" key={index}>
                  <div className="tranfers w-full p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
                    <table>
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
                        <tr>
                          <td className="text-center">{transfer.first_name}</td>
                          <td className="text-center">{formatDate(transfer.created_at)}</td>
                          <td className="text-center">{transfer.amount} {transfer.currency}</td>
                          <td className="text-center">{transfer.id}</td>
                          <td className="text-center">{transfer.status}</td>
                          <td className="text-center">
                            <button
                              className={!showButtonArray[index] ? 'hidden' : 'block'}
                              type="button"
                              onClick={() => transferDetails(transfer.id)}
                            >{pending ? (<img src={LoadingGif} alt="loading_gif" />) : 'view details'}</button>
                          </td>
                          <td className="text-center"><button type="button" onClick={() => viewButton(index)}>...</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : <>details empty</>
      }
    </div>
  );
};

export default UsersTransaction;