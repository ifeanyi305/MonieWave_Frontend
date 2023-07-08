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
      Exchange rates
      <form onSubmit={newExchangeRate}>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
        >
          <option value="">Select currency</option>
          <option value="euro">Euro</option>
          <option value="pounds">Pounds</option>
        </select>
        <button type="submit">Create rate</button>
      </form>
    </div>
  );
};

export default ExchangeRates;