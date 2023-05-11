import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../redux/flash/flash';
import { verifyOtp, resetStateAndKeepFlash } from '../../redux/auth/auth';

const Otp = ({otp, email, setOtp, setNumber}) => {
  const { verified, errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const verifyotp = (e) => {
    e.preventDefault();
    const  userOtp= {
      otp, email
    }
    dispatch(verifyOtp(userOtp))
  }

  useEffect(() => {
    if (verified) {
      console.log("success")
      setNumber(4);
      dispatch(resetStateAndKeepFlash());
      flash('success', 'email verified')
    } else if (errors) {
      console.log("not success")
      flash('error', 'Invalid credentials')
    }
    console.log("normal")
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
            className="form-control"
            placeholder="otp"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input type="submit" value="verify" />
        </form>
    </div>
  );
};

export default Otp;
