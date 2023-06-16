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
import { createSuperUser } from '../../redux/superUser/superUser';

const Users = () => {
  const { successful, pending, failed } = useSelector((state) => state.users);
  const { progress, loading } = useSelector((state) => state.userDetails);
  const { success, coming, error } = useSelector((state) => state.superUser);
  const allUsers = successful?.successful?.users;
  const [showButtonArray, setShowButtonArray] = useState(Array(allUsers?.length).fill(false));
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage, entriesPerPage, entries } = usePagination(1, 10);

  // Create super user
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verified, setVerification] = useState(true);
  const [role, setRole] = useState('admin');
  const [userModal, setUserModal] = useState(false);

  const createUser = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert('error', 'password do not match')
      return;
    }
    const user = {
      first_name, last_name, email, country,
      password, verified, role
    }
    dispatch(createSuperUser(user));
    setFirstname('');
    setLastname('');
    setEmail('');
    setCountry('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
  }

  const handleUserModal = () => {
    setUserModal(!userModal);
  }
  /////

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
    <div>
      <div className={!userModal ? 'hidden' : 'block w-full h-full p-6 fixed top-0 bg-[#000000ca]'}>
        <div className='bg-[#fff] create_user_container rounded-[24px] recipientModal h-[90%] md:w-[40%] p-6 absolute top-[5%] md:left-[20%]'>
          <div className="flex mb-[5%] items-center justify-between">
            <p className="text-[#212121] text-[20px] font-extrabold">Add new user</p>
            <button type="button" onClick={handleUserModal} className="text-[25px]">&times;</button>
          </div>
          <form onSubmit={createUser}>
            <div className="my-4">
              <label className="block">Type of user <span className="text-[#C50713] text-[17px]">*</span></label>
              <select
                value={role}
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                onChange={(e) => setRole(e.target.value)}>
                <option value="admin">admin</option>
                <option value="customer">customer</option>
                <option value="support">support</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block">First name of user <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                type="text"
                value={first_name}
                placeholder="First name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="block">Second name of user <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                type="text"
                value={last_name}
                placeholder="Last name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="block">Email address of user <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="block">Country of user <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                type="text"
                value={country}
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="block">Password <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="block">Confirm password <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
                type="password"
                value={confirmPassword}
                placeholder="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
            >
              {
              coming ? 'Creating user...' :
               error ? 'An error has occurred, try refreshing' :
               success ? 'User created successfully' :
               'Create user'
               }
            </button>
          </form>
        </div>
      </div>
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
          <button type="button" onClick={handleUserModal}>Add user</button>
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
    </div>
  );
};

export default Users;