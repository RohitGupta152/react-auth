import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../components/VerifyOTP.css';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const email = location.state?.email; // Retrieve email from state

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown); // Cleanup interval when the component unmounts or timer reaches 0
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);
  

  useEffect(() => {
    // Redirect if email is missing (unauthorized access)
    if (!email) {
      toast.error('Unauthorized access! Redirecting to login.');
      navigate('/login');
    }
  }, [email, navigate]);

  

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://node-auth-q7wx.onrender.com/api/auth/verify-otp', {
        email,
        otp,
      });

      toast.success('OTP verified successfully! Redirecting...', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Save token and redirect to profile
      localStorage.setItem('token', response.data.token);
      setTimeout(() => navigate('/profile'), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Invalid OTP. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://node-auth-q7wx.onrender.com/api/auth/resend-otp', { email });

      toast.success('OTP resent successfully. Please check your email.', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Reset timer and disable Resend OTP button
      setTimer(120); // Reset to 2 minutes
      setIsResendEnabled(false);
    } catch (error) {
      const errorMessage = error?.data?.msg || 'Failed to resend OTP. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="verify-container">
  <h2 className="verify-title">Verify OTP</h2>
  <form className="verify-form" onSubmit={handleVerify}>
    <div className="input-group">
      <label className="input-label">Email</label>
      <div className="input-icon-container">
        <i className="fas fa-envelope input-icon"></i> {/* Email icon */}
        <input 
          className="input-field" 
          type="email" 
          value={email} 
          placeholder="Enter your Email" 
          readOnly 
          disabled 
        />
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">OTP</label>
      <div className="input-icon-container">
        <i className="fas fa-key input-icon"></i> {/* OTP icon */}
        <input
          className="input-field"
          type="text"
          value={otp}
          placeholder="Enter your OTP"
          onChange={(e) => setOtp(e.target.value)}
          disabled={isResendEnabled}
        />
      </div>
    </div>
    {timer > 0 ? (
      <div className="timer">Time remaining: <p>{formatTimer()}</p></div>
    ) : (
      <div className="expired">OTP expired</div>
    )}
    {!isResendEnabled ? (
      <button className="verify-button" type="submit" disabled={timer <= 0}>
        Verify OTP
      </button>
    ) : (
      <button className="resend-button" type="button" onClick={handleResendOTP}>
        Resend OTP
      </button>
    )}
  </form>
  <ToastContainer />
</div>

  );
};

export default VerifyOTP;
