import React from 'react';
import Ratehive from '../assets/images/navbar/RateHive.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const lists = [
    {
      title: 'Company',
      about: 'About Us',
      contact: 'Contact'
    },
    {
      title: 'MonieWave Products',
      transfers: 'Money Transfers',
      app: 'RateHive App'
    },
    {
      title: 'Legal & Policies',
      terms: 'Terms of use',
      report: 'Report a friend',
      policy: 'Privacy Policy',
      Cookie: 'Cookie Policy',
    },
    {
      title: 'Connect with us',
      linkedin: 'Linkedin',
      instagram: 'Instagram',
      twitter: 'Twitter',
      telegram: 'Telegram',
    }
  ]

  const style = {
    title: 'text-[20px] text-[#FAFAFA] font-extrabold',
    text: 'text-[13px] py-[3%] text-[#FAFAFA]',
  }
  return (
    <div>
      <div className="px-[5%] bg-[#1A0F2E]">
        <div className="flex mt-[6%] gap-4 py-[6%] text-[#fff] flex-wrap items-start justify-between">
          <h1><img src={Ratehive} alt="title" /></h1>
          <ul>
            <li className={style.title}>{lists[0].title}</li>
            <li className={style.text}>{lists[0].about}</li>
            <Link to="/Contact"><li className={style.text}>{lists[0].contact}</li></Link>
          </ul>
          <ul>
            <li className={style.title}>{lists[1].title}</li>
            <li className={style.text}>{lists[1].transfers}</li>
            <li className={style.text}>{lists[1].app}</li>
          </ul>
          <ul>
            <li className={style.title}>{lists[2].title}</li>
            <li className={style.text}>{lists[2].terms}</li>
            <li className={style.text}>{lists[2].report}</li>
            <li className={style.text}>{lists[2].policy}</li>
            <li className={style.text}>{lists[2].Cookie}</li>
          </ul>
          <ul>
            <li className={style.title}>{lists[3].title}</li>
            <li className={style.text}>{lists[3].linkedin}</li>
            <li className={style.text}>{lists[3].instagram}</li>
            <li className={style.text}>{lists[3].twitter}</li>
            <li className={style.text}>{lists[3].telegram}</li>
          </ul>
        </div>
        <div className="py-[5%]">
          <hr className="border-[#E6DBFA] border-[1px]" />
          <p className="text-center text-[#fff] pt-[10px] text-[12px]">Copyright &copy; 2023 RateHive</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;