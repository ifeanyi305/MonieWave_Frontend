import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="dark:bg-[#000] App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      {/* Authentication Routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
