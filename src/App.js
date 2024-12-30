import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import './App.css'

import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOtp from './pages/VerifyOTP';

import Navbar from './pages/Navbar';


import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';  // Import ForgotPassword page
import ResetPassword from './pages/ResetPassword';  // Import ResetPassword page
import StarryBackground from './pages/StarryBackground';



const App = () => {
  return (
    <Router>
      <Navbar />
      <StarryBackground />
      <div> 
        {/* <h1 style={{textAlign:'center', padding:'25px', color:'white'}}>Welcome to My App</h1> */}
        <Routes>
          <Route path="/" element={<Login />} />          
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot password route */}
          <Route path="/reset-password" element={<ResetPassword />} />
          
        </Routes>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} />
        {/* Toast container to show notifications */}
        
      </div>
    </Router>
  );
};

export default App;
