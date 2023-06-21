import React, { useEffect, useState, useMemo } from 'react';
import { usePagination, Pagination } from "pagination-react-js";
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowUpLeft } from 'react-icons/bs';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransfers } from '../../redux/moneyTransfer/allTransfers';
import { showUserTransfer } from '../../redux/moneyTransfer/showTransfer';
import LoadingGif from './images/loading-icon.gif';

const UsersTransaction = () => {
  const { success, loading, error } = useSelector((state) => state.getAllTransfers);
  const { progress, pending } = useSelector((state) => state.showTransfer);
  const transfers = success?.success?.transfers;
  const reversedTransfer = useMemo(() => {
    return transfers?.slice().reverse();
  }, [transfers]);
  const [selectedPage, setSelectedPage] = useState([]);
  const [showButtonArray, setShowButtonArray] = useState(Array(transfers?.length).fill(false));
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage, entriesPerPage, entries } = usePagination(1, 10);

  useEffect(() => {
    dispatch(fetchAllTransfers());
  }, [dispatch]);

  useEffect(() => {
    setSelectedPage(reversedTransfer || []);
  }, [reversedTransfer]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectStatus = (e) => {
    if (e.target.value === "all") {
      return setSelectedPage(reversedTransfer)
    }
    const status = e.target.value;
    const pageSelected = reversedTransfer?.filter(
      (page) => page.status === status,
    );
    setSelectedPage(pageSelected);
  };

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
            className="border-none py-[12px] bg-transparent focus:outline-none"
            placeholder="search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <select
          name="page"
          id="page"
          className="bg-[#F9F6FE] text-[#814DE5] text-[20px] border-[#D5C4F6] border-[1px] rounded-[16px] p-[16px] cursor-pointer"
          onChange={handleSelectStatus}
        >
          <option value="all">All</option>
          <option value="Pending">pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="py-4">
        <div className="select-wrapper max-elements">
          <label className="block font-extrabold text-[20px]" htmlFor="max-elements">Entries per page:</label>
          <select className="py-4 hover:bg-[#E1E4E7] cursor-pointer focus:outline-none px-2 rounded-[10px]" name="max-elements" id="max-elements" onChange={e => { currentPage.set(1); entriesPerPage.set(Number(e.target.value)); }}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={selectedPage?.length}>All</option>
          </select>
        </div>
        <p className="text-end py-4">Showing {`${entries.indexOfFirst + 1}-${entries.indexOfLast} of ${transfers?.length}`}</p>
        <div className="border-[1px] tranfers p-2 border-[#E6E6E6] bg-[#fff] rounded-[24px]">
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
                      selectedPage.slice(entries.indexOfFirst, entries.indexOfLast).filter((transfer) =>
                        transfer.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((transfer, index) => (
                        <tr key={transfer.id}>
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
        <Pagination
          entriesPerPage={entriesPerPage.get}
          totalEntries={transfers?.length}
          currentPage={{ get: currentPage.get, set: currentPage.set }}
          offset={3}
          classNames={{
            wrapper: "pagination flex items-center justify-center gap-6 mt-4",
            item: 'pagination-item cursor-pointer text-[16px]',
            itemActive: "pagination-item-active",
            navPrev: "pagination-item nav-item cursor-pointer",
            navNext: "pagination-item nav-item cursor-pointer",
            navStart: "pagination-item nav-item cursor-pointer",
            navEnd: "pagination-item nav-item cursor-pointer",
            navPrevCustom: "pagination-item cursor-pointer",
            navNextCustom: "pagination-item cursor-pointer"
          }}
          showFirstNumberAlways={true}
          showLastNumberAlways={true}
          navStart={<button className="text-[16px] bg-[#FCFBFE] rounded-[6px] py-2 px-4 gap-2 flex items-center"><BsArrowUpLeft />First</button>}
          navEnd={<button className="text-[16px] bg-[#FCFBFE] rounded-[6px] py-2 px-4 gap-2 flex items-center"><BsArrowUpRight /> Last</button>}
          navPrev={<button className="hover:bg-[#E1E4E7] font-extrabold text-[20px] rounded-[7px] px-4">&#x2039;</button>}
          navNext={<button className="hover:bg-[#E1E4E7] font-extrabold text-[20px] rounded-[7px] px-4">&#x203a;</button>}
          navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
          navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
        />
      </div>
    </div>
  );
};

export default UsersTransaction;
