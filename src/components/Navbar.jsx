import React from 'react';
import { BsFillMoonFill } from 'react-icons/bs';
import { CgSun } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import ukFlag from '../assets/images/navbar/Flag.png';
import { Link } from 'react-router-dom';
import Ratehive from '../assets/images/navbar/RateHive.png';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [theme, setTheme] = useState(null);
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  const style = {
    header: 'flex flex-wrap landing_page_navbar justify-between navbar py-4 w-full dark:bg-[#000] dark:text-[#fff] items-center',
    flex_gap: 'flex flex-wrap items-center gap-[5px]',
    flex_gap2: 'flex justify-end px-2 auth_button_con w-full flex-wrap items-center gap-[10px]',
    nav_list: 'flex flex-wrap landing_page_nav_list gap-[7px] items-center',
    padding: 'p-[13px]'
  }

  return (
    <div>
      <div className="md:hidden px-6 flex gap-4 items-center justify-between py-4">
        <Link to="/"><h1><img className="md:w-[200px]" src={Ratehive} alt="title" /></h1></Link>
        <div className="md:hidden flex gap-4 items-center">
          {/* <button className="" onClick={handleThemeSwitch}>
            {theme === 'dark' ? (<CgSun className="text-[#fff]" />) : (<BsFillMoonFill />)}
          </button> */}
          <button onClick={handleNavbar} className="button" type="button">
            {!navbar ? <RxHamburgerMenu /> : <AiOutlineClose className="text-[#fff]" />}
          </button>
        </div>
      </div>
      <div className={`landing_page_navbar_con ${navbar ? 'open' : 'close'}`}>
        <div className="flex landing_page_navbar_con2 items-center gap-4 py-4 px-14">
          <div className="title_con">
          <Link to="/"><h1><img className="md:w-[200px]" src={Ratehive} alt="title" /></h1></Link>
            <div className="md:hidden flex gap-4 items-center">
              {/* <button className="" onClick={handleThemeSwitch}>
                {theme === 'dark' ? (<CgSun className="text-[#fff]" />) : (<BsFillMoonFill />)}
              </button> */}
              <button onClick={handleNavbar} type="button" className="">&times;</button>
            </div>
          </div>
          <nav className={style.header}>
            <ul className={style.nav_list}>
              <Link to="/login"><li className={style.padding}>Make transfers</li></Link>
              <Link to="/aboutus"><li className={style.padding}>About Us</li></Link>
              <Link to="/Contact"><li className={style.padding}>Contact</li></Link>
              <li className={style.flex_gap}>
                <img src={ukFlag} alt="ukflag" />
                <li className="p-[13px] text-[#966BE9] dark:text-[#7D5CC1]">EN</li>
              </li>
            </ul>
          </nav>
          <div className={style.flex_gap2}>
            <button type="button" className="p-2 login_btn bg-transparent md:w-[160px] text-center border-[#814DE5] text-[#814DE5] border-[1px]"><Link to='/login'>Login</Link></button>
            <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] md:w-[160px] text-center"><Link to='/signup'>Sign Up</Link></button>
            {/* <button className="hidden md:block" onClick={handleThemeSwitch}>
              {theme === 'dark' ? (<CgSun className="text-[#fff]" />) : (<BsFillMoonFill />)}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;