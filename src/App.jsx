import { ToastContainer } from 'react-toastify';
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
import { getToken } from './redux/auth/auth';

function App() {
  const isAuthenticated = getToken();
  return (
    <div className="dark:bg-[#000] App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={isAuthenticated ? <UserDashboard /> : <LandingPage />} />
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
