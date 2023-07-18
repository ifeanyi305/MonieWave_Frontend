import React from 'react';
import Ratehive from '../../assets/images/navbar/RateHive.png';
import { Link } from 'react-router-dom';
import { signout } from '../../redux/auth/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebar, handleSidebar }) => {
  const style = {
    padding: "py-6",
    checking: 'bg-[#000] h-[100%] fixed w-[50%] md:w-[20%]'
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
    navigate('/login');
    window.location.reload();
  };
  return (
    <div className={`bg-[#000] h-[100%] sidebar fixed w-[100%] md:w-[20%] ${sidebar ? 'open' : 'close'}`}>
      <div className="mt-6"><h1><img className="p-6" src={Ratehive} alt="title" /></h1></div>
      <div className="flex justify-center md:justify-start">
        <ul className="text-[#FAFAFA] m-6">
          <Link onClick={handleSidebar} to="/"><li className={style.padding}>Home</li></Link>
          <Link onClick={handleSidebar} to="/send_money"><li className={style.padding}>Send money</li></Link>
          <Link onClick={handleSidebar} to="/recipients"><li className={style.padding}>Recipients</li></Link>
          <Link onClick={handleSidebar} to="/transactions"><li className={style.padding}>Transactions</li></Link>
          <Link onClick={handleSidebar} to="/chatbot"><li className={style.padding}>Live chat bot</li></Link>
          <Link onClick={handleSidebar} to="/chatbot">
            <li className={style.padding}>
              <button
                type="button"
                onClick={handleLogout}
              > Logout
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
