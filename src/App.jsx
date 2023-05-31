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
import SendMoney from './pages/dashboard/transferprocess/SendMoney';
import Navbar from './pages/dashboard/Navbar';
import Recipients from './pages/dashboard/Recipients';
import Transactions from './pages/dashboard/Transactions';
import { getToken } from './redux/auth/auth';

function App() {
  const isAuthenticated = getToken();
  const [sidebar, setSidebar] = useState(false)
  const handleSidebar = () => {
    setSidebar(!sidebar)
  }
  return (
    <div className="dark:bg-[#000] App">
      <ToastContainer />
      <div>
        {
          isAuthenticated ? (
            <section className='flex gap-6'>
              <Sidebar sidebar={sidebar} />
              <div className="md:ml-[20%] w-full">
                <Navbar handleSidebar={handleSidebar} sidebar={sidebar} />
                <Routes>
                  <Route path="/" element={<UserDashboard />} />
                  <Route path="/send_money" element={<SendMoney />} />
                  <Route path="/recipients" element={<Recipients />} />
                  <Route path="/transactions" element={<Transactions />} />
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
