import React from 'react';
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
  const userName = isAuthenticated.username;
  const contents = [
    {
      title: 'Recent Transactions',
      icon: <div className="bg-[#E0DBFF] rounded-[50%] p-2"><GrTransaction className="text-[#1155BB]" /></div>,
      amount: 20,
      detail: <img className='width-[9px]' src={Arrow} alt="up arrow" />,
      id: 1,
    },
    {
      title: 'Total USers',
      icon: <div className="bg-[#F4DDFF] rounded-[50%] p-2"><FaUsers className="text-[#F101F6]" /></div>,
      amount: 20,
      detail: <img className='width-[9px]' src={Arrow} alt="up arrow" />,
      id: 2,
    },
    {
      title: 'New Users',
      icon: <div className="bg-[#E6E4F0] rounded-[50%] p-2"><BsPersonPlus className="text-[#2E9FAE]" /></div>,
      amount: 20,
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
          <p>{userName} &darr;</p>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap">
        {
          contents.map((content) => (
            <div key={content.id} className="p-4 mb-2 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
              <div className="mb-4">
                <div className="flex items-start justify-between">
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
        <div className="flex justify-between items-center">
          <p className="text-[#212121] text-[24px] font-[600]">Recent Transactions</p>
          <Link to='/users_transaction'><p className="text-[#814DE5] text-[19px]">See all</p></Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name of User</th>
              <th>Date and time of transactions</th>
              <th>Amount sent(Euro/Pounds)</th>
              <th>Transaction ID</th>
              <th>Transaction status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ogad</td>
              <td>japasm</td>
              <td>kfjfrr</td>
              <td>kfjfrr</td>
              <td>kfjfrr</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;