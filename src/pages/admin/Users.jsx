import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Users = () => {
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
      <div className="tranfers p-4 bg-[#fff] border-[1px] border-[#909090] rounded-[24px]">
        <Link to="/users_lists">
          <table>
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
              <tr>
                <td className="text-center">ogad</td>
                <td className="text-center">japasm</td>
                <td className="text-center">kfjfrr</td>
                <td className="text-center">kfjfrr</td>
                <td className="text-center">kfjfrr</td>
              </tr>
            </tbody>
          </table>
        </Link>
      </div>
    </div>
  );
};

export default Users;