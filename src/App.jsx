import { ToastContainer } from 'react-toastify';
import React, { useState } from 'react';
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
import SendMoney from './pages/dashboard/SendMoney';
import Recipients from './pages/dashboard/Recipients';
import Transactions from './pages/dashboard/Transactions';
import TransferStatus from './pages/dashboard/TransferStatus';
import AdminRoutes from './pages/ProtectedRoute/AdminRoutes';
import CustomerRoute from './pages/ProtectedRoute/CustomerRoute';
import PublicRoutes from './pages/ProtectedRoute/PublicRoutes';
import Users from './pages/admin/Users';
import UsersTransaction from './pages/admin/UsersTransaction';
import TransactDetails from './pages/admin/TransactDetails';
import UsersLists from './pages/admin/UsersLists';
import Home from './pages/admin/Home';
import ContactUs from './pages/ContactUs';
import ExchangeRates from './pages/admin/ExchangeRates';
import ChatBot from './pages/livebot/ChatBot';

function App() {
  const [sidebar, setSidebar] = useState(false);
  const [recipient_name, setRecipient_name] = useState('');
  const [recipient_account, setRecipient_account] = useState('');
  const [recipient_bank, setRecipient_bank] = useState('');
  const [recipient_phone, setRecipient_phone] = useState('');
  const [role, setRole] = useState('customer');

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="dark:bg-[#000] App">
      <ToastContainer />
      <div>
        {/* Customer Routes */}

        <Routes>
          <Route element={<CustomerRoute handleSidebar={handleSidebar} sidebar={sidebar} />}>
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
          </Route>
        </Routes>

        {/* Public Routes */}

        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup role={role} setRole={setRole} />} />
            {/*  */}
            <Route path="/SignupSuccesful" element={<SignupSuccesful />} />
            {/* Reset Password Routes */}
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ResetPasswordLinkSent" element={<ResetPasswordLinkSent />} />
            <Route path="/reset_password" element={<NewPassword />} />
          </Route>
        </Routes>

        {/* Admin Routes */}

        <div className='admin'>
          <Routes>
            <Route element={<AdminRoutes handleSidebar={handleSidebar} sidebar={sidebar} />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users_transaction" element={<UsersTransaction />} />
              <Route path="/transact_details" element={<TransactDetails />} />
              <Route path="/users_lists" element={<UsersLists />} />
              <Route path="/exchange_rates" element={<ExchangeRates />} />
              <Route path="/chatbot" element={<ChatBot />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
