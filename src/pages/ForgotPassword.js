import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import '../components/ForgotPassword.css';
import { Link } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  // const [toggle, setToggle] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://node-auth-q7wx.onrender.com/api/auth/forgot-password', { email });
      toast.success('OTP sent to your email', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Redirect to OTP verification page
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 3000);

    } catch (error) {
      toast.error('Error: ' + (error.response?.data?.msg || 'Something went wrong'));
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
      
      <div className="input-group">
          <label className="input-label">Email</label>
          <div className="input-wrapper">
            <i className="input-icon fas fa-envelope"></i> {/* Email icon */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="forgot-password-input"
            />
          </div>
      </div>
        
        <button type="submit" className="forgot-password-button">
          <i className="fas fa-paper-plane"></i> {/* Send icon */}
          Send OTP
        </button>
      </form>
      <p>
      <Link to="/register" className="register-link">Create Account</Link>
      </p>
      <p>
        <Link to="/login" className="login-link">User Login</Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
