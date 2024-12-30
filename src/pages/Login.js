import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../components/Login.css';

import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile'); // Redirect to profile if authenticated
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      await axios.post('https://node-auth-q7wx.onrender.com/api/auth/login', { email, password });

      toast.success('OTP sent to your email. Please verify.', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Redirect to OTP verification page
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Invalid email or password!';
      toast.error(errorMsg, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };


  return (
    <div className="login-container">
      <h2>Account Login</h2>
      
      <form onSubmit={handleSubmit}>
      
      <div className="input-group">
       <label>Email</label>
        <div className="input-wrapper">
         <i className="input-icon fas fa-envelope"></i> {/* Left icon for Email */}
         <input
         type="email"
         placeholder="Enter your Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        </div>
      </div>

      <div className="input-group">
      <label>Password</label>
      <div className="input-wrapper">
      <i className="input-icon fas fa-lock"></i> {/* Left icon for Password */}
      <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button
      type="button"
      className="eye-button"
      onClick={() => setShowPassword(!showPassword)}
      >
      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
      </button>
      </div>
      </div>

      <button className="button" type="submit">
      Login
      </button>

      </form>
      
      <p>
      <Link to="/register" className="register-link">Create Account</Link>
      </p>
      <p>
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
