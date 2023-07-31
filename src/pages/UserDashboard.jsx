import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../redux/auth/auth';
import Authentication from '../components/Authentication';
import { useSelector } from 'react-redux';
import { GrNotification } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createChart } from 'lightweight-charts';

const Redirect = () => {
  const { user } = useSelector((state) => state.auth);
  // const euroRef = useRef(null);


  const userDetails = getToken();
  const token = userDetails?.username;


  //   const fetchRates = async (newDiv) => {
  //     const response = await axios.get('https://ratehive-api.fly.dev/api/v1/rate/history');
  //     console.log("i'm the ressponse", response)
  //     const data = response.data.data.Euro
  //     const Areadata = data.map((d) => {
  //       const timestamp = new Date(d.time);
  //       const formattedDate = timestamp.toLocaleDateString('en-GB');
  //       const formattedTime = formattedDate.substring(6, 10) + '-' + formattedDate.substring(3, 5) + '-' + formattedDate.substring(0, 2);
  //       console.log(formattedTime)
  //       return { value: d.price, time: formattedTime }
  //     })
  //     const chartOptions = { layout: { textColor: 'white', background: { type: 'solid', color: 'black' } } };
  //     const chart = createChart(newDiv, chartOptions);
  //     const areaSeries = chart.addAreaSeries({ lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' });
  //     areaSeries.setData(Areadata);
  //     chart.timeScale().fitContent();
  //     console.log("i'm the data", Areadata);
  //     console.log("the response from the request" chatData)
  //   };

  // useEffect(() => {
  //   const newNode = euroRef.current;
  //   const newDiv = newNode.appendChild(document.createElement('div'));

  //   fetchRates(newDiv);
  // }, [])

  <Authentication />
  return (
    <div className="p-6">
      <div className="flex mb-[4%] justify-between wrap items-center">
        <h1 className="text-[40px] text-[#212121]">Hi {token}</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>{token}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="py-4">Make Transfers</p>
        <div className="send_btn bg-[#000] p-6">
          <div className="pb-4">
            <p className="text-[#FAFAFA] text-[28px] heading_text">Bank transfer or card?</p>
            <p className="text-[#FAFAFA] text-[28px] heading_text">We've got you covered</p>
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" className="p-2 login_btn bg-[#814DE5] text-[#fff] w-[160px] text-center">
              <Link to='/send_money'>Send money</Link>
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* <p>Today's exchange rates</p> */}
        {/* <div ref={euroRef}>
        </div> */}
      </div>
    </div>
  );
};

export default function UserDashboard() {
  const isAuthenticated = getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Redirect />;
}
