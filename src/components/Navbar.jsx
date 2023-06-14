import React from 'react';
import { BsFillMoonFill } from 'react-icons/bs';
import { CgSun } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import ukFlag from '../assets/images/navbar/Flag.png';
import { Link } from 'react-router-dom';
import Ratehive from '../assets/images/navbar/RateHive.png';

const Navbar = () => {
  const [theme, setTheme] = useState(null);

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

  const style = {
    header: 'flex flex-wrap justify-between navbar w-full dark:bg-[#000] bg-[#fff] dark:text-[#fff] items-center py-4 ',
    flex_gap: 'flex flex-wrap items-center gap-[5px]',
    flex_gap2: 'flex px-2 flex-wrap items-center gap-[10px]',
    nav_list: 'flex flex-wrap gap-[7px] items-center',
    padding: 'p-[13px]'
  }

  return (
    <div className="">
      <nav className={style.header}>
        <ul className={style.nav_list}>
          <li><a href='/broken'><img src={Ratehive} alt="title" /></a></li>
          <li className={style.padding}><a href='/broken'>Make transfers</a></li>
          <li className={style.padding}><a href='/broken'>About Us</a></li>
          <Link to="/Contact"><li className={style.padding}>Contact</li></Link>
          <li className={style.flex_gap}>
            <img src={ukFlag} alt="ukflag" />
            <li className="p-[13px] text-[#966BE9] dark:text-[#7D5CC1]"><a href='/broken'>EN</a></li>
          </li>
        </ul>
        <div className={style.flex_gap2}>
          <Link to='/login'><button type="button" className="p-2 login_btn bg-transparent w-[160px] text-center border-[#814DE5] text-[#814DE5] border-[1px]">Login</button></Link>
          <Link to='/signup'><button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">Sign Up</button></Link>
          <button className="" onClick={handleThemeSwitch}>
              {theme === 'dark' ? (<CgSun />) : (<BsFillMoonFill />)}
            </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;