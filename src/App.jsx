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
                  <Route path="/send_money" element={<SendMoney />} />
                  <Route path="/" element={isAuthenticated ? <UserDashboard /> : <LandingPage />} />
                </Routes>
              </div>
            </section>
          ) :
            ''
        }
      </div>
      <Routes>
        <Route path="/SignupSuccesful" element={<SignupSuccesful />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
      {/* Authentication Routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* Reset Password Routes */}
      <Routes>
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ResetPasswordLinkSent" element={<ResetPasswordLinkSent />} />
        <Route path="/reset_password" element={<NewPassword />} />
      </Routes>
    </div>
  )
}

export default App
