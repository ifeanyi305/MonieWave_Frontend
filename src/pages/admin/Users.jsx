import React, { useEffect, useState } from 'react';
import { usePagination, Pagination } from "pagination-react-js";
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowUpLeft } from 'react-icons/bs';
import { BsArrowUpRight } from 'react-icons/bs';
import { fetchAllUsers } from '../../redux/users/users';
import { showUserDetails } from '../../redux/users/userDetails';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import LoadingGif from './images/loading-icon.gif';

const Users = () => {
  const { successful, pending, failed } = useSelector((state) => state.users);
  const { progress, loading } = useSelector((state) => state.userDetails);
  const allUsers = successful?.successful?.users;
  const [showButtonArray, setShowButtonArray] = useState(Array(allUsers?.length).fill(false));
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage, entriesPerPage, entries } = usePagination(1, 10);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const viewButton = (index) => {
    setShowButtonArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const userDetails = (id) => {
    dispatch(showUserDetails(id))
    if (progress) {
      navigate('/users_lists')
    }
  }

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
      <div className="flex flex-wrap my-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#464646]">User's list</h1>
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
        <p><b className="font-[600] text-[24px] text-[#212121]">Customers</b></p>
      </div>
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
          <option value={allUsers?.length}>All</option>
        </select>
      </div>
      <p className="text-end py-4">Showing {`${entries.indexOfFirst + 1}-${entries.indexOfLast} of ${allUsers?.length}`}</p>
      <div className="border-[1px] bg-[#fff] mb-4 tranfers p-2 border-[#E6E6E6] rounded-[24px]">
        <table className="w-full p-4 bg-[#fff]">
          <thead>
            <tr>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Name</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Email address</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Last login</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Activity status</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              pending ? (<>fetching users</>)
                : failed ? (<>an error occured while fetching users</>)
                  : allUsers ? (
                    allUsers.slice(entries.indexOfFirst, entries.indexOfLast).filter((user) =>
                      user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((user, index) => (
                      <tr key={index}>
                        <td className="text-center text-[12px] ">{user.first_name} {user.last_name}</td>
                        <td className="text-center text-[12px]">{user.email}</td>
                        <td className="text-center text-[12px]">{formatDate(user.last_login)} at {formatTime(user.last_login)}</td>
                        <td className="justify-center p-2 flex gap-[3px] items-center text-[12px]">
                          {
                            user.status == "Active" ?
                              (<div className="font-[900] bg-[#37A13C] rounded-[50%] p-[5px]"></div>)
                              : (<div className="font-[900] bg-[#C50713] rounded-[50%] p-[5px]"></div>)
                          }
                          {user.status}
                        </td>
                        <td className="text-center"><button type="button" onClick={() => viewButton(index)}>...</button></td>
                        <td className="text-center text-[12px]">
                          <button
                            className={!showButtonArray[index] ? 'hidden' : 'block'}
                            type="button"
                            onClick={() => userDetails(user.id)}
                          >{loading ? (<img src={LoadingGif} alt="loading_gif" />) : 'view details'}</button>
                        </td>
                      </tr>
                    ))
                  ) : <>Users empty</>
            }
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <Pagination
            entriesPerPage={entriesPerPage.get}
            totalEntries={allUsers?.length}
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
              navPrevCustom: "pagination-item bg-[#000]",
              navNextCustom: "pagination-item"
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

export default Users;