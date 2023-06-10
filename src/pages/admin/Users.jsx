import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

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
            className="border-none py-[12px] focus:outline-none"
            placeholder="search"
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <p><b className="font-[600] text-[24px] text-[#212121]">Customers</b></p>
      </div>
      <div className="border-[1px] tranfers p-2 border-[#909090] rounded-[24px]">
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
                      allUsers.map((user, index) => (
                        <tr key={index}>
                          <td className="text-center text-[12px] ">{user.first_name} {user.last_name}</td>
                          <td className="text-center text-[12px]">{user.email}</td>
                          <td className="text-center text-[12px]">{formatDate(user.last_login)}at{formatTime(user.last_login)}</td>
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
    </div>
  );
};

export default Users;