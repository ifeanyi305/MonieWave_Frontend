import React from 'react';
import Ratehive from '../../assets/images/navbar/RateHive.png';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebar, handleSidebar }) => {
  const style = {
    padding: "py-6",
    checking: 'bg-[#000] h-[100%] fixed w-[50%] md:w-[20%]'
  }
  return (
    <div className={`bg-[#000] h-[100%] sidebar fixed w-[100%] md:w-[20%] ${sidebar ? 'open' : 'close'}`}>
      <div className="mt-6"><h1><img className="p-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center md:justify-start">
        <ul className="text-[#FAFAFA] m-6">
          <Link onClick={handleSidebar} to="/"><li className={style.padding}>Home</li></Link>
          <Link onClick={handleSidebar} to="/users_transaction"><li className={style.padding}>Transactions</li></Link>
          <Link onClick={handleSidebar} to="/users"><li className={style.padding}>Users</li></Link>
          <Link onClick={handleSidebar} to="/exchange_rates"><li className={style.padding}>Exchange Rates</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;