import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
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
import TermsOfUse from './pages/about/TermsOfUse';
import Cookies from './pages/about/Cookies';
import Privacy from './pages/about/Privacy';
import AboutUs from './pages/about/AboutUs';
import ReportFraud from './pages/about/ReportFraud';
import ExchangeRates from './pages/admin/ExchangeRates';
import ChatBot from './pages/livebot/ChatBot';
import Chats from './pages/admin/Chats';
import Messages from './pages/admin/Messages';
import Fee from './pages/admin/Fee';
import { signout } from './redux/auth/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { flash } from './redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetailsString = localStorage.getItem('user');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const tokenExpiryDay = userDetails?.token?.token_expiry_date ? new Date(userDetails?.token.token_expiry_date) : null;
  const currentDate = new Date();
  useEffect(() => {
    const checkExpiry = () => {
      if (currentDate.getTime() >= tokenExpiryDay?.getTime()) {
        flash('warning', 'Your session has expired, redirecting you to login');
        setTimeout(() => {
          dispatch(signout());
          navigate('/login');
        }, 60000);
      }
    }

    const timerId = setTimeout(checkExpiry, 60000);

    return () => clearTimeout(timerId);
  }, [currentDate, tokenExpiryDay, dispatch, navigate]);

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
            <Route path="/chatbot" element={<ChatBot />} />
          </Route>
        </Routes>

        {/* Public Routes */}

        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/reportfraud" element={<ReportFraud />} />
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
              <Route path="/chats" element={<Chats />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/fee" element={<Fee />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
