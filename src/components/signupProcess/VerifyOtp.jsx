import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../redux/flash/flash';
import { verifyOtp, resetStateAndKeepFlash } from '../../redux/auth/auth';
import Loading from '../../assets/images/loading/loading-icon.gif';

const Otp = ({ otp, email, setOtp, setNumber, setVerification, sendVerication }) => {
  const { verified, errors, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const verifyotp = (e) => {
    e.preventDefault();
    const userOtp = {
      otp, email
    }
    dispatch(verifyOtp(userOtp))
  }

  useEffect(() => {
    if (verified) {
      setVerification(true)
      setNumber(4);
      dispatch(resetStateAndKeepFlash());
      flash('success', 'email verified')
    } else if (errors) {
      flash('error', 'Invalid otp')
    }
  }, [verified, errors])

  return (
    <div>
      <ToastContainer />
      <form onSubmit={verifyotp}>
        <input
          type="number"
          id="test"
          name="text"
          value={otp}
          className="p-4 block w-full rounded-[8px] border-[#6B6B6B] border-[1px]"
          placeholder="otp"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className="mt-[8px] border-[0px] bg-transparent text-[#814DE5] text-[16px] font-[600]"
          type='button' onClick={sendVerication}>
          Didn&apos;t recieve a code? resend code
        </button>
        <button type="submit" className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center">
          {
            loading ? (<img src={Loading} className="w-[25px] m-auto" alt="loading" />) : (<>Verify otp</>)
          }
        </button>
      </form>
    </div>
  );
};

export default Otp;
