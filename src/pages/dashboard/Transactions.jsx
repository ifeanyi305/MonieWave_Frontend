import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { fetchTransfers } from '../../redux/moneyTransfer/fetchTransfer';
import { Link } from 'react-router-dom';

const Transactions = () => {
  const { victory, loading, error } = useSelector((state) => state.allTransfers);
  const [searchQuery, setSearchQuery] = useState('');
  const transfers = victory?.victory
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransfers());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <p><b className="font-[600] text-[24px] text-[#212121]">Transaction History</b></p>
      </div>
      {
        loading ? (<p>loading...</p>)
          : error ? (<p>an error occured while loading transfers, try refreshing the page</p>) : transfers ? (
            transfers.filter((transfer) =>
              transfer.recipient_name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((transfer) => (
              <div key={transfer.id}>
                <div className="flex justify-between items-center">
                  <p className="text-[#6B6B6B] text-[19px]">{formatDate(transfer.created_at)}</p>
                  <p className={
                    transfer.status == 'Pending' ?
                      'text-[#F9B608] text-[12px]' :
                      transfer.status == 'Processing' ?
                        'text-[#814DE5] text-[12px]' :
                        transfer.status == 'Completed' ?
                          'text-[#37A13C] text-[12px]' :
                          transfer.status == 'Rejected' ?
                            'text-[#C50713] text-[12px]' :
                            'text-[#000] text-[12px]'
                  }>{transfer.status}</p>
                </div>
                <Link className="no-underline" state={transfer} to="/transfer_status">
                  <div className="border-[1px] border-[#D3D3D3] flex justify-between items-center mb-[5%] rounded-[24px] w-full p-6">
                    <div>
                      <p className="text-[#464646] pb-4 text-[20px] font-[500]">{transfer.recipient_name}</p>
                      <p className="text-[#464646] text-[14px] font-[400]">{transfer.recipient_bank}</p>
                    </div>
                    <div>
                      <p className="text-[#464646] pb-4 text-[20px] font-[600]">{transfer.naira_amount}</p>
                      <p className="text-[#814DE5] text-[14px] font-[400]">Download receipt</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (<>Transfers not available</>)
      }
    </div>
  );
};

export default Transactions;