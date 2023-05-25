import React, { useState, useEffect } from 'react';
import { GrNotification } from 'react-icons/gr';
import exchange from './images/exchange.png';
import axios from 'axios';
import Select from 'react-select';
import _ from 'lodash';

const TransferMoney = ({ setNumber }) => {
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState('Euro');
  const [baseAmount, setBaseAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [checkRate, setCheckRate] = useState(0);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/rate/latest_all');
      setRates(response.data.data);
    };
    fetchRates();
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/fee_ranges')
      .then(response => {
        const rateFee = response.data;
        const amount = parseFloat(baseAmount);
        if (amount >= 1 && amount <= 100) {
          setFee(rateFee.data[0].fee)
        } else if (amount >= 101 && amount <= 300) {
          setFee(rateFee.data[1].fee)
        } else if (amount >= 301 && amount <= 500) {
          setFee(rateFee.data[2].fee)
        } else if (amount >= 501 && amount <= 1000) {
          setFee(rateFee.data[3].fee)
        } else if (amount >= 1001 && amount <= 1000000000000000) {
          setFee(rateFee.data[4].fee)
        } else {
          setFee(0)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [baseAmount]);

  useEffect(() => {
  }, [fee]);

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  const handleBaseAmountChange = (event) => {
    setBaseAmount(event.target.value);
  };

  const formatNumber = (num = 0) => {
    return num.toLocaleString("en-NG", {
      style: 'currency',
      currency: 'NGN'
    })
  }

  useEffect(() => {
    let nairaAmount;
    if (currency === "Pounds") {
      nairaAmount = rates?.Pounds?.price * baseAmount
      setCheckRate(rates?.Pounds?.price);
    } else if (currency === "Euro") {
      nairaAmount = rates?.Euro?.price * baseAmount
      setCheckRate(rates?.Euro?.price);
    }
    setConvertedAmount(formatNumber(nairaAmount));
  }, [rates, currency, baseAmount]);
  console.log("the rate",checkRate)
  const options = Object.keys(rates).map((currency) => ({
    value: currency,
    label: currency,
  }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: state.isFocused ? 'transparent' : 'none',
      width: '100%',
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#6B6B6B',
        color: 'white',
      },
    }),
  };
  return (
    <div className="px-6">
      <div className="flex my-[4%] justify-between wrap items-start">
        <h1 className="text-[40px] text-[#212121]">Send Money</h1>
        <div className="flex gap-4">
          <button><GrNotification /></button>
          <p>Flourish Ralph &darr;</p>
        </div>
      </div>
      <div>
        <p className="text-[28px]">Currency Conversion</p>
        <p className="">Your currency is being converted to naira</p>
      </div>
      <div className="py-6 md:w-[45%]">
        <div>
          <label className="block">you send</label>
          <div className="flex gap-[2px] border-[#6B6B6B] rounded-[8px] pl-[5px] border-[1px] items-center">
            <input
              type="number"
              value={baseAmount}
              onChange={handleBaseAmountChange}
              className="w-full p-4 block border-none focus:outline-none"
            />
            <Select
              value={{ value: currency, label: currency }}
              onChange={(selectedOption) =>
                handleCurrencyChange(selectedOption)
              }
              options={options}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="my-6">
          <img src={exchange} className="m-auto" alt="exchange" />
        </div>
        <div>
          <label className="block">Osadebanem Ralph recieves exactly</label>
          <input
            type="text"
            value={convertedAmount} readOnly
            className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
          />
        </div>
        <div className="flex my-4 justify-between items-center">
          <p>Our fee</p>
          <p>{fee}GPD</p>
        </div>
        <label className="block py-2">total amount: {convertedAmount}</label>
        <button
          type="button"
          className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
          onClick={() => setNumber(1)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferMoney;