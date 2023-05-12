import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calculator from '../assets/images/landingpage/calculator.png';
import Transactions from '../assets/images/landingpage/transactions.png';
import Rectangle from '../assets/images/landingpage/Rectangle.png';
import { Link } from 'react-router-dom';
import down from '../assets/images/landingpage/down.png';
import user2 from '../assets/images/landingpage/user2.png';
import num1 from '../assets/images/landingpage/num1.png';
import num2 from '../assets/images/landingpage/num2.png';
import num3 from '../assets/images/landingpage/num3.png';
import phone from '../assets/images/landingpage/phone.png';
import appstore from '../assets/images/landingpage/Appstore.png';
import googleplay from '../assets/images/landingpage/googleplay.png';
import { getToken } from '../redux/auth/auth';

const LandingPage = () => {
  const style = {
    flex: 'flex card justify-between mt-[15px] rounded-[15px] bg-[#1B1B1B] text-[#fff] dark:bg-[#1B1B1B] dark:text-[#fff] items-center py-4 px-[18px]',
    card_img: 'm-auto mt-[23px]',
    card_text: 'w-[235px] mt-[18%] text-[#fff] text-center',
    card: 'rounded-[11px] p-[13px] border-[#814DE5] border-[1px]',
  }
  const isAuthenticated = getToken();
  return (
    <>
      <Navbar />
      <div className="containers">
        <div className={style.flex}>
          <div className="border-[#814DE5] h-[316px] rounded-[11px] border-[1px] px-2 py-4">
            <div className="mb-6 mt-6">
              <p>1 Euro equals</p>
              <p className="text-[28px]">507.47 Nigerian Naira</p>
            </div>
            <div className="flex justify-center mt-[29%]">
              <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                <Link to={isAuthenticated ? '/userdashboard' : '/login'}>Send money</Link>
              </button>
            </div>
          </div>
          <div className="px-4">
            <img className="m-auto mb-6 mt-4 w-[72px] h-[72px]" src={Calculator} alt="calculator" />
            <p className="text-center mb-4 mt-2">RateHive</p>
            <img className="w-[289px]" src={Transactions} alt="transact" />
          </div>
          <div className="border-[#814DE5] h-[316px] rounded-[11px] border-[1px] px-2 py-4">
            <div className="mb-6 mt-6">
              <p>1 Pound Sterling equal</p>
              <p className="text-[28px]">507.47 Nigerian Naira</p>
            </div>
            <div className="flex justify-center mt-[29%]">
              <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                <Link to={isAuthenticated ? '/userdashboard' : '/login'}>Send money</Link>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex mt-[-1px] justify-center items-center">
            <img src={Rectangle} alt="rectangle" />
          </div>
          <div className="flex mt-[-18%] detail justify-center">
            <div>
              <p className="text-[#fff]">check it out</p>
              <img className="mt-10 m-auto" src={down} alt="down" />
            </div>
          </div>
        </div>
        <div className="flex mt-[15%] px-[5%] justify-between items-start">
          <div>
            <p className="block mb-[10px] md:w-[666px] dark:text-[#fff] text-[40px] font-[700]">
              Send Money to Nigeria with Ease
              Instantly Convert Euros and Pounds
              to Naira at Low Rates!
            </p>
            <p className="md:w-[574px] dark:text-[#fff] mt-[5%] text-[20px]">
              With RateHive, you can effortlessly convert your
              Euros and Pounds to Naira and send money to
              Nigeria instantly at the best exchange rates.
            </p>
            <div className="mt-[10%]">
              <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                <Link to={isAuthenticated ? '/userdashboard' : '/login'}>Get started</Link>
              </button>
            </div>
          </div>
          <div>
            <img src={user2} alt="user" />
          </div>
        </div>
        <div className="bg-[#212121] mt-[10%]">
          <div className="px-[5%]">
            <div className="text-[#fff] dark:text-[#fff] pt-[10%]">
              <p className="pounds text-[40px] pb-[10px] text-[#FAFAFA] font-[700]">A Simple Way To Make Transfers</p>
              <p className="pounds text-[20px] pb-[7%]">
                With no limitations, you can swiftly exchange <br />
                and send money to Nigeria using these steps.
              </p>
            </div>
            <div className="flex justify-evenly items-center">
              <div className={style.card}>
                <img className={style.card_img} src={num1} alt="user" />
                <p className={style.card_text}>
                  Get started by clicking
                  on the Sign up button to
                  create your account.
                </p>
              </div>
              <div className={style.card}>
                <img className={style.card_img} src={num2} alt="user" />
                <p className={style.card_text}>
                  Fill in the necessary
                  information so you can
                  have a personalized
                  experience.
                </p>
              </div>
              <div className={style.card}>
                <img className={style.card_img} src={num3} alt="user" />
                <p className={style.card_text}>
                  Make quick money transfers
                  to Nigeria conveniently and
                  at a low cost transfer fee.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-[4%] pb-[9%]">
              <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                <Link to={isAuthenticated ? '/userdashboard' : '/login'}>Send money</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-[15%] px-[5%] justify-between items-start">
          <div>
            <p className="block mb-[10px] md:w-[666px] dark:text-[#fff] text-[30px] font-extrabold">
              Securely Send Money with RateHive.
            </p>
            <p className="md:w-[574px] dark:text-[#fff] mt-[5%] text-[20px]">
              When it comes to sending money to Nigeria,
              security is key. That's why RateHive offers a safe
              and secure platform for your transfers.
            </p>
            <p className="md:w-[574px] dark:text-[#fff] mt-[5%] text-[20px]">
              With our trusted technology, you can rest easy
              knowing that your money is in good hands.
            </p>
            <div className="mt-[10%]"><button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center"><Link to='/signup'>Send money</Link></button></div>
            <div className="flex mt-6 gap-2 items-center">
              <a href='/broken'><img src={appstore} className="w-[150px]" alt="Appstore" /></a>
              <a href='/broken'><img src={googleplay} className="w-[150px]" alt="googleplay" /></a>
            </div>
          </div>
          <div>
            <img src={phone} className="h-[602px]" alt="phone" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;