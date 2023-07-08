import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createExchangeRate } from '../../redux/exchangeRate/exchangeRate';
import { flash } from '../../redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';

const ExchangeRates = () => {
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");
  const { loading } = useSelector((state) => state.exchangeRate);
  const dispatch = useDispatch();

  const newExchangeRate = (e) => {
    e.preventDefault();
    const data = {
      data: {
        currency,
        price
      }
    }
    dispatch(createExchangeRate(data)).then((res) => {
      if (res.error) {
        flash('error', res.payload.response.data.message);
      } else {
        flash('success', res.payload.success);
      }
    });
    setCurrency('');
    setPrice('');
  };

  return (
    <div className="px-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-[24px] font-extrabold my-2">Exchange rates</h1>
      <form onSubmit={newExchangeRate}>
        <div className="flex gap-4 items-center flex-wrap">
          <div>
            <label className="block">Price<sup className="text-[#CA1C2B]">*</sup></label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
          <div className="my-2">
            <label className="block">Currency<sup className="text-[#CA1C2B]">*</sup></label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            >
              <option value="">Select currency</option>
              <option value="euro">Euro</option>
              <option value="pounds">Pounds</option>
            </select>
          </div>
          <button
            type="submit"
            className="py-2 px-4 mt-[27px] mb-2 rounded-[8px] bg-[#814DE5] text-[#fff] text-center"
          >
            Create rate
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExchangeRates;