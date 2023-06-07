import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import { Routes, Route } from 'react-router-dom';
import SignupSuccesful from './pages/SignupSuccesful';
import ForgotPassword from './components/resetPassword/ForgotPassword';
import NewPassword from './components/resetPassword/NewPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import ResetPasswordLinkSent from './components/resetPassword/ResetPasswordLinkSent';
import Sidebar from './pages/dashboard/Sidebar';
import SendMoney from './pages/dashboard/SendMoney';
import Navbar from './pages/dashboard/Navbar';
import Recipients from './pages/dashboard/Recipients';
import Transactions from './pages/dashboard/Transactions';
import TransferStatus from './pages/dashboard/TransferStatus';
import { getToken } from './redux/auth/auth';

function App() {
  const isAuthenticated = getToken();
  const [sidebar, setSidebar] = useState(false);
  const [recipient_name, setRecipient_name] = useState('');
  const [recipient_account, setRecipient_account] = useState('');
  const [recipient_bank, setRecipient_bank] = useState('');
  const [recipient_phone, setRecipient_phone] = useState('');
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="dark:bg-[#000] App">
      <ToastContainer />
      <div>
        {
          isAuthenticated ? (
            <section className='flex gap-6'>
              <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} />
              <div className="md:ml-[20%] w-full">
                <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
                <Routes>
                  <Route path="/" element={<UserDashboard />} />
                  <Route path="/send_money" element={
                    <SendMoney
                      recipient_name={recipient_name}
                      setRecipient_name={setRecipient_name}
                      recipient_account={recipient_account}
                      setRecipient_account={setRecipient_account}
                      recipient_bank={recipient_bank}
                      setRecipient_bank={setRecipient_bank}
                      recipient_phone={recipient_phone}
                      setRecipient_phone={setRecipient_phone}
                    />
                  } />
                  <Route path="/recipients" element={
                    <Recipients
                      recipient_name={recipient_name}
                      setRecipient_name={setRecipient_name}
                      recipient_account={recipient_account}
                      setRecipient_account={setRecipient_account}
                      recipient_bank={recipient_bank}
                      setRecipient_bank={setRecipient_bank}
                      recipient_phone={recipient_phone}
                      setRecipient_phone={setRecipient_phone}
                    />
                  } />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/transfer_status" element={<TransferStatus />} />
                </Routes>
              </div>
            </section>
          ) :
            <Routes>
              <Route path="/" element={<LandingPage />} />
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/*  */}
              <Route path="/SignupSuccesful" element={<SignupSuccesful />} />
              {/* Reset Password Routes */}
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />
              <Route path="/ResetPasswordLinkSent" element={<ResetPasswordLinkSent />} />
              <Route path="/reset_password" element={<NewPassword />} />
            </Routes>
        }
      </div>
    </div>
  )
}

export default App
