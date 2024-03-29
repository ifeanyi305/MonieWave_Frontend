import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransfers } from '../../redux/moneyTransfer/allTransfers';
import { fetchAllUsers } from '../../redux/users/users';
import { Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { getToken } from '../../redux/auth/auth';
import { GrTransaction } from 'react-icons/gr';
import { FaUsers } from 'react-icons/fa';
import { BsPersonPlus } from 'react-icons/bs';
import { BsPersonCheckFill } from 'react-icons/bs';
import Arrow from '../../assets/images/admin/arrowVector.png';

const Home = () => {
  const isAuthenticated = getToken();
  const userName = isAuthenticated?.username;
  const { success, loading, error } = useSelector((state) => state.getAllTransfers);
  const transfers = success?.success?.transfers;
  const reversedTransfer = transfers?.slice().reverse();
  const { successful, pending, failed } = useSelector((state) => state.users);
  const allUsers = successful?.successful?.users;
  const reversedUsers = allUsers?.slice().reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransfers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

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

  const formatTime = (timestamp) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  const contents = [
    {
      title: 'Recent Transactions',
      icon: <div className="bg-[#E0DBFF] rounded-[50%] p-2"><GrTransaction className="text-[#1155BB]" /></div>,
      amount: transfers?.length,
      detail: <img className='width-[9px]' src={Arrow} alt="up arrow" />,
      id: 1,
    },
    {
      title: 'Total USers',
      icon: <div className="bg-[#F4DDFF] rounded-[50%] p-2"><FaUsers className="text-[#F101F6]" /></div>,
      amount: allUsers?.length,
      detail: <img className='width-[9px]' src={Arrow} alt="up arrow" />,
      id: 2,
    },
    {
      title: 'New Users',
      icon: <div className="bg-[#E6E4F0] rounded-[50%] p-2"><BsPersonPlus className="text-[#2E9FAE]" /></div>,
      amount: allUsers?.length,
      detail: <img className='width-[9px]' src={Arrow} alt="up arrow" />,
      id: 3,
    },
    {
      title: 'Number of visitors',
      icon: <div className="bg-[#D2EBC6] rounded-[50%] p-2"><BsPersonCheckFill className="text-[#37A13C]" /></div>,
      amount: 20,
      detail: <img className='width-[9px]' src={Arrow} alt="up arrow" />,
      id: 4,
    }
  ]
  return (
    <div className="p-6">
      <div className="flex mb-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#212121]">Welcome back {userName}!</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>{userName}</p>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap">
        {
          contents.map((content) => (
            <div key={content.id} className="p-4 mb-2 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
              <div className="mb-4">
                <div className="flex items-start gap-4 justify-between">
                  {content.icon}
                  <p className="text-[#212121] text-[16px] font-[600]">{content.title}</p>
                </div>
                <p className="text-[#212121] text-[16px] text-end font-[600]">{content.amount}</p>
              </div>
              <p className="text-end flex gap-2">{content.detail} <span className="text-[#37A13C]">10%</span> up from last week</p>
            </div>
          ))
        }
      </div>
      <div className="my-6">
        <div className="flex mb-4 justify-between items-center">
          <p className="text-[#212121] text-[24px] font-[600]">Recent Transactions</p>
          <Link to='/users_transaction'><p className="text-[#814DE5] text-[19px]">See all</p></Link>
        </div>
        <div className="border-[1px] tranfers p-2 border-[#E6E6E6 bg-[#fff] rounded-[24px]">
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
                      reversedTransfer.slice(0, 7).map((transfer) => (
                        <tr key={transfer.id}>
                          <td className="text-center text-[12px] py-4">{transfer.first_name}</td>
                          <td className="text-center text-[12px]">{formatDate(transfer.created_at)} at {formatTime(transfer.created_at)}</td>
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
                        </tr>
                      ))
                    ) : <>details empty</>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-6">
        <div className="flex mb-4 justify-between items-center">
          <p className="text-[#212121] text-[24px] font-[600]">Users</p>
          <Link to='/users'><p className="text-[#814DE5] text-[19px]">See all</p></Link>
        </div>
        <div className="w-full flex items-center flex-wrap gap-2 p-4">
          {
            pending ? (<>fetching users...</>)
              : failed ? (<>an error occured while fetching users</>)
                : allUsers ? (
                  reversedUsers.slice(0, 10).map((user) => (
                    <div key={user.id} className=" w-full flex flex-wrap user_container gap-4 justify-between items-center p-4 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
                      <div>
                        <p className="text-[16px] text-[#212121] font-[600]">{user.first_name} {user.last_name}</p>
                        <small className="text-[#6B6B6B] text-[12px]">{user.email}</small>
                      </div>
                      <div>
                        <p className="text-[16px] text-[#212121] font-[600]">Last login</p>
                        <small className="text-[#6B6B6B] text-[12px]">{formatDate(user.last_login)}</small>
                      </div>
                      <div className="flex items-center gap-[4px]">
                        {
                          user.status == "Active" ?
                          (<div className="font-[900] bg-[#37A13C] rounded-[50%] p-[5px]"></div>)
                          : (<div className="font-[900] bg-[#C50713] rounded-[50%] p-[5px]"></div>)
                        }
                        <p>{user.status}</p>
                      </div>
                    </div>
                  ))
                ) : <>Users empty</>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;