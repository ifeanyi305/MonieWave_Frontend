import React, { useState, useEffect } from 'react';
import { GrNotification } from 'react-icons/gr';
import exchange from './images/exchange.png';
import axios from 'axios';
import Select from 'react-select';
import _ from 'lodash';

const TransferMoney = ({
  setNumber, currency, setCurrency, amount,
  setAmount, naira_amount, setNaira_amount,
  exchange_rate, setExchange_rate, fee, setFee
}) => {
  const [rates, setRates] = useState({});
  const [loadingRates, setloadingRates] = useState(true);
  const [error, setError] = useState('');

  const validateForm = () => {
    return  amount.length !== 0 && naira_amount.length !== 0;
  };

  const fetchRates = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/rate/latest_all');
      setRates(response.data.data);
      setloadingRates(false);
    } catch (error) {
      setError('An error occurred while fetching the Rates');
      fetchRates();
      setloadingRates(false);
    }
  };

  useEffect(() => {
    setError('');
    fetchRates();
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/fee_ranges')
      .then(response => {
        const rateFee = response.data;
        const baseAmount = parseFloat(amount);
        if (baseAmount >= 1 && baseAmount <= 100) {
          setFee(rateFee.data[0].fee)
        } else if (baseAmount >= 101 && baseAmount <= 300) {
          setFee(rateFee.data[1].fee)
        } else if (baseAmount >= 301 && baseAmount <= 500) {
          setFee(rateFee.data[2].fee)
        } else if (baseAmount >= 501 && baseAmount <= 1000) {
          setFee(rateFee.data[3].fee)
        } else if (baseAmount >= 1001 && baseAmount <= 1000000000000000) {
          setFee(rateFee.data[4].fee)
        } else {
          setFee(0)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [amount]);

  useEffect(() => {
  }, [fee]);

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  const handleBaseAmountChange = (event) => {
    setAmount(event.target.value);
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
      nairaAmount = rates?.Pounds?.price * amount
      setExchange_rate(rates?.Pounds?.price);
    } else if (currency === "Euro") {
      nairaAmount = rates?.Euro?.price * amount
      setExchange_rate(rates?.Euro?.price);
    }
    setNaira_amount(formatNumber(nairaAmount));
  }, [rates, currency, amount]);
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
              value={amount}
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
          {loadingRates ? (
            <input
              type="text"
              value="Loading Rates..." readOnly
              className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />) : error ? (
              <input
                type="text"
                value={error} readOnly
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              />) : (
            <input
              type="text"
              value={naira_amount} readOnly
              className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          )}
        </div>
        <div className="flex my-4 justify-between items-center">
          <p>Our fee</p>
          <p>{fee}GPD</p>
        </div>
        <button
          type="button"
          disabled={!validateForm()}
          className={validateForm() ?
            'p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'
            : 'p-2 mt-[27px] opacity-40 mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'}
          onClick={() => setNumber(1)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferMoney;