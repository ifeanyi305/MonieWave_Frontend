import React from 'react';
import { BsFillMoonFill } from 'react-icons/bs'
import { CgSun } from 'react-icons/cg'
import { useState, useEffect } from 'react'

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
  return (
    <div>
      <p>navbar</p>
      <button className="" onClick={handleThemeSwitch}>
        {theme === 'dark' ? (<CgSun />) : (<BsFillMoonFill />)}
      </button>
    </div>
  );
};

export default Navbar;