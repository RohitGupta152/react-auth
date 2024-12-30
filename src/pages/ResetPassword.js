import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../components/ResetPassword.css'




const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // Email passed from previous step

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsOtpExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Redirect to forgot-password page if email is not available
  useEffect(() => {
    if (!email) {
      toast.error('Unauthorized access. Please restart the password reset process.');
      navigate('/forgot-password'); // Redirect to the forgot-password page
    }
  }, [email, navigate]);
  

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('https://node-auth-q7wx.onrender.com/api/auth/forgot-password', { email });
      toast.success(response.data.msg || 'OTP resent successfully!');
      setTimeLeft(300); // Reset timer to 5 minutes
      setIsOtpExpired(false);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to resend OTP.');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is missing. Please restart the reset password process.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Make reset-password API call
      const response = await axios.post('https://node-auth-q7wx.onrender.com/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });

      toast.success(response.data.msg);

      // Redirect to the login page
      setTimeout(() => navigate('/login'), 2000); // Add slight delay for better user experience
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Something went wrong');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="reset-password-container">
      <ToastContainer />
      <h2>Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleReset}>
        
        <label htmlFor="otp" className="input-label">OTP</label>
        <div className="input-wrapper">
          <i className="fas fa-key input-icon"></i>
          <input
            type="text"
            className="reset-password-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            disabled={isOtpExpired}
          />
        </div>


        <label htmlFor="new-password" className="input-label">New Password</label>
        <div className="input-wrapper">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={showNewPassword ? 'text' : 'password'}
            className="reset-password-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
            disabled={isOtpExpired}
          />

          <button
          type="button"
          className="eye-button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          >
         <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
         </button>

        </div>

        <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
        <div className="input-wrapper">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="reset-password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            disabled={isOtpExpired}
          />

          <button
          type="button"
          className="eye-button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
          <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </button>

        </div>

        
          {timeLeft > 0 ? (
            <p className='timer'>Time Left :<p>{formatTime(timeLeft)}</p></p>
          ) : (
            <p className='expired'>OTP has expired.</p>
          )}
        

        {isOtpExpired ? (
          <button onClick={handleResendOtp} className="resend-otp-button">
            Resend OTP
          </button>
        ) : (
          <button className="reset-password-submit-button" onClick={handleReset}>
            Reset Password
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
