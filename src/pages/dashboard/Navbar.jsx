import React from 'react';
import Ratehive from '../../assets/images/navbar/RateHive.png';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = ({ handleSidebar, sidebar }) => {
  return (
    <div className="flex md:hidden mt-6 justify-between items-center p-6">
      <h1><img src={Ratehive} alt="title" /></h1>
      <button onClick={handleSidebar} className="button" type="button">
        {!sidebar ? <RxHamburgerMenu /> : <AiOutlineClose className="text-[#fff]"  />}
      </button>
    </div>
  );
};

export default Navbar;