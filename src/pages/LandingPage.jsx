import React, { useState, useEffect } from 'react';
import SwiperCore, {
  Navigation, Pagination, Mousewheel, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calculator from '../assets/images/landingpage/calculator.png';
import Transactions from '../assets/images/landingpage/transactions.png';
import Rectangle from '../assets/images/landingpage/curvy_shape.png';
import down from '../assets/images/landingpage/down.png';
import user2 from '../assets/images/landingpage/user2.png';
import num1 from '../assets/images/landingpage/num1.png';
import num2 from '../assets/images/landingpage/num2.png';
import num3 from '../assets/images/landingpage/num3.png';
import phone from '../assets/images/landingpage/phone.png';
import appstore from '../assets/images/landingpage/Appstore.png';
import googleplay from '../assets/images/landingpage/googleplay.png';
import { Link } from 'react-router-dom';
SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

const LandingPage = () => {
  const style = {
    flex: 'flex card justify-between mt-[15px] rounded-[15px] bg-[#1B1B1B] text-[#fff] dark:bg-[#1B1B1B] dark:text-[#fff] items-center py-4 px-[18px]',
    card_img: 'm-auto mt-[23px]',
    card_text: 'w-[235px] mt-[18%] text-[#fff] text-center',
    card: 'rounded-[11px] p-[13px] border-[#814DE5] border-[1px]',
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const breakpoint = 768;

  return (
    <>
      <Navbar />
      <div className="px-14">
        {
          screenWidth > breakpoint ? (
            <div>
              <div className={style.flex}>
                <div className="border-[#814DE5] h-[316px] rounded-[11px] border-[1px] px-2 py-4">
                  <div className="mb-6 mt-6">
                    <p>1 Euro equals</p>
                    <p className="text-[28px]">507.47 Nigerian Naira</p>
                  </div>
                  <div className="flex justify-center mt-[29%]">
                    <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                      <Link to='/login'>Send money</Link>
                    </button>
                  </div>
                </div>
                <div className="px-4">
                  <img className="m-auto mb-6 mt-4 w-[72px] h-[72px]" src={Calculator} alt="calculator" />
                  <p className="text-center mb-4 mt-2">MonieWave</p>
                  <img className="w-[289px]" src={Transactions} alt="transact" />
                </div>
                <div className="border-[#814DE5] h-[316px] rounded-[11px] border-[1px] px-2 py-4">
                  <div className="mb-6 mt-6">
                    <p>1 Pound Sterling equal</p>
                    <p className="text-[28px]">507.47 Nigerian Naira</p>
                  </div>
                  <div className="flex justify-center mt-[29%]">
                    <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                      <Link to='/login'>Send money</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1B1B1B] send_money_preview_con text-[#fff] py-4 px-[18px]">
              <Swiper
                modules={[Navigation, Pagination, Mousewheel, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop
                mousewheel
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                <SwiperSlide>
                  <div className="border-[#814DE5] h-[316px] rounded-[11px] border-[1px] px-2 py-4">
                    <div className="mb-6 mt-6">
                      <p>1 Euro equals</p>
                      <p className="text-[28px]">507.47 Nigerian Naira</p>
                    </div>
                    <div className="flex justify-center mt-[29%]">
                      <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                        <Link to='/login'>Send money</Link>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="px-4">
                    <img className="m-auto mb-6 mt-4 w-[72px] h-[72px]" src={Calculator} alt="calculator" />
                    <p className="text-center mb-4 mt-2">MonieWave</p>
                    <img className="w-[289px] m-auto" src={Transactions} alt="transact" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="border-[#814DE5] h-[316px] rounded-[11px] border-[1px] px-2 py-4">
                    <div className="mb-6 mt-6">
                      <p>1 Pound Sterling equal</p>
                      <p className="text-[28px]">507.47 Nigerian Naira</p>
                    </div>
                    <div className="flex justify-center mt-[29%]">
                      <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                        <Link to='/login'>Send money</Link>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          )
        }
        <div>
          <div className="flex mt-[-4px] justify-center items-center">
            <img src={Rectangle} alt="rectangle" />
          </div>
        </div>
        <div className="flex flex-wrap mt-[15%] justify-between items-start">
          <div>
            <p className="block mb-[10px] md:w-[666px] dark:text-[#fff] md:text-[40px] text-[28px] font-[700]">
              Send Money to Nigeria with Ease
              Instantly Convert Euros and Pounds
              to Naira at Low Rates!
            </p>
            <p className="md:w-[574px] dark:text-[#fff] mt-[5%] text-[20px]">
              With MonieWave, you can effortlessly convert your
              Euros and Pounds to Naira and send money to
              Nigeria instantly at the best exchange rates.
            </p>
            <div className="mt-[10%]">
              <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
                <Link to='/login'>Get started</Link>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <img src={user2} alt="user" />
          </div>
        </div>
      </div>
      <div className="bg-[#212121] w-full mt-[10%]">
        <div className="px-[5%]">
          <div className="text-[#fff] dark:text-[#fff] pt-[10%]">
            <p className="pounds text-[40px] pb-[10px] text-[#FAFAFA] font-[700]">A Simple Way To Make Transfers</p>
            <p className="pounds text-[20px] pb-[7%]">
              With no limitations, you can swiftly exchange <br />
              and send money to Nigeria using these steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-evenly items-center">
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
              <Link to='/login'>Send money</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="px-14">
        <div className="flex flex-wrap mt-[15%] justify-between items-start">
          <div>
            <p className="block mb-[10px] md:w-[666px] dark:text-[#fff] text-[30px] font-extrabold">
              Securely Send Money with MonieWave.
            </p>
            <p className="md:w-[574px] dark:text-[#fff] mt-[5%] text-[20px]">
              When it comes to sending money to Nigeria,
              security is key. That's why MonieWave offers a safe
              and secure platform for your transfers.
            </p>
            <p className="md:w-[574px] dark:text-[#fff] mt-[5%] text-[20px]">
              With our trusted technology, you can rest easy
              knowing that your money is in good hands.
            </p>
            <div className="mt-[10%]"><button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center"><Link to='/signup'>Send money</Link></button></div>
            <div className="flex mt-6 gap-2 items-center">
              <img src={appstore} className="w-[150px]" alt="Appstore" />
              <img src={googleplay} className="w-[150px]" alt="googleplay" />
            </div>
          </div>
          <div className="mt-4">
            <img src={phone} className="h-[602px]" alt="phone" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;