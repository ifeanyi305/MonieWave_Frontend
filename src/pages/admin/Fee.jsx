import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createFee } from '../../redux/fee/createFee';
import { updateFee } from '../../redux/fee/updateFee';
import { flash } from '../../redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';

const Fee = () => {
  const [start_price, setStartPrice] = useState();
  const [end_price, setEndPrice] = useState(0);
  const [fee, setFee] = useState(0);
  const [update_start_price, setUpdateStartPrice] = useState();
  const [update_end_price, setUpdateEndPrice] = useState(0);
  const [update_fee, setUpdateFee] = useState(0);
  const dispatch = useDispatch();

  const handleStartPriceChange = (e) => {
    const selectedStartPrice = parseInt(e.target.value);
    setStartPrice(selectedStartPrice);

    if (selectedStartPrice === 0) {
      setEndPrice(100);
    } else if (selectedStartPrice === 101) {
      setEndPrice(300);
    } else if (selectedStartPrice === 301) {
      setEndPrice(500);
    } else if (selectedStartPrice === 501) {
      setEndPrice(1000);
    } else if (selectedStartPrice === 1001) {
      setEndPrice(10000000000);
    } else {
      setEndPrice(0);
    }
  };

  const handleUpdateStartPriceChange = (e) => {
    const selectedUpdateStartPrice = parseInt(e.target.value);
    setUpdateStartPrice(selectedUpdateStartPrice);

    if (selectedUpdateStartPrice === 0) {
      setUpdateEndPrice(100);
    } else if (selectedUpdateStartPrice === 101) {
      setUpdateEndPrice(300);
    } else if (selectedUpdateStartPrice === 301) {
      setUpdateEndPrice(500);
    } else if (selectedUpdateStartPrice === 501) {
      setUpdateEndPrice(1000);
    } else if (selectedUpdateStartPrice === 1001) {
      setUpdateEndPrice(10000000000);
    } else {
      setUpdateEndPrice(0);
    }
  };

  const newFee = (e) => {
    e.preventDefault();
    const data = {
      data: {
        start_price,
        end_price,
        fee
      }
    }
    dispatch(createFee(data)).then((res) => {
      if (res.error) {
        flash('error', "res.payload.response.data.message");
      } else {
        flash('success', "res.payload.success");
      }
    });
    setStartPrice(0);
    setEndPrice(0);
    setFee(0);
  };

  const changeFee = (e) => {
    e.preventDefault();
    const data = {
      data: {
        start_price: update_start_price,
        end_price: update_end_price,
        fee: update_fee
      }
    }
    dispatch(updateFee(data)).then((res) => {
      if (res.error) {
        flash('error', "res.payload.response.data.message");
      } else {
        flash('success', "res.payload.success");
      }
    });
    setUpdateStartPrice(0);
    setUpdateEndPrice(0);
    setUpdateFee(0);
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
      <h1 className="text-[24px] font-extrabold my-2">Create Fee</h1>
      <form onSubmit={newFee}>
        <div className="flex gap-4 items-center flex-wrap">
          <div>
            <label className="block">Start price<sup className="text-[#CA1C2B]">*</sup></label>
            <select
              value={start_price}
              onChange={handleStartPriceChange}
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            >
              <option value="start">select start price</option>
              <option value="0">0</option>
              <option value={"101"}>101</option>
              <option value={"301"}>301</option>
              <option value={"501"}>501</option>
              <option value={"1001"}>1001</option>
            </select>
          </div>
          <div className="my-2">
            <label className="block">End price<sup className="text-[#CA1C2B]">*</sup></label>
            <input
              value={end_price}
              readOnly
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
          <div>
            <label className="block">Fee<sup className="text-[#CA1C2B]">*</sup></label>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              required
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 mt-[27px] mb-2 rounded-[8px] bg-[#814DE5] text-[#fff] text-center"
          >
            Create fee
          </button>
        </div>
      </form>
      <p className="text-[24px] font-extrabold my-2">Update Fee</p>
      <form onSubmit={changeFee}>
        <div className="flex gap-4 items-center flex-wrap">
          <div>
            <label className="block">Start price<sup className="text-[#CA1C2B]">*</sup></label>
            <select
              value={update_start_price}
              onChange={handleUpdateStartPriceChange}
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            >
              <option value={"start"}>update start price</option>
              <option value={0}>0</option>
              <option value={101}>101</option>
              <option value={301}>301</option>
              <option value={501}>501</option>
              <option value={1001}>1001</option>
            </select>
          </div>
          <div className="my-2">
            <label className="block">End price<sup className="text-[#CA1C2B]">*</sup></label>
            <input
              value={update_end_price}
              readOnly
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
          <div>
            <label className="block">Fee<sup className="text-[#CA1C2B]">*</sup></label>
            <input
              type="number"
              value={update_fee}
              onChange={(e) => setUpdateFee(e.target.value)}
              required
              className="border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 mt-[27px] mb-2 rounded-[8px] bg-[#814DE5] text-[#fff] text-center"
          >
            Update fee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Fee;