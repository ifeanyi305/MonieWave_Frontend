import React from 'react';
import Ratehive from '../../assets/images/navbar/RateHive.png';

const Sidebar = ({sidebar}) => {
  const style = {
    padding: "py-6",
    checking: 'bg-[#000] h-[100%] fixed w-[50%] md:w-[20%]'
  }
  return (
    <div className={`bg-[#000] h-[100%] sidebar fixed w-[100%] md:w-[20%] ${sidebar ? 'open' : 'close'}`}>
      <div className="mt-6"><h1><img className="p-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center md:justify-start">
        <ul className="text-[#FAFAFA] m-6">
          <li className={style.padding}>Home</li>
          <li className={style.padding}>Send money</li>
          <li className={style.padding}>Recipients</li>
          <li className={style.padding}>Transactions</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;