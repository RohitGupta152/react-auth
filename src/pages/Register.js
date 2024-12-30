import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../components/Register.css';
import { Link } from 'react-router-dom';



const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to profile or home if token exists
      navigate('/profile');
    }
  }, [navigate]); 



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://node-auth-q7wx.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });
      console.log(response)

      // Notify user of success
      toast.success('Registration successful! Please verify your OTP.', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Redirect to Verify OTP page, passing email as state
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 3000);
    } catch (error) {
      // Handle errors
      const errorMessage = error.response?.data?.msg || 'An error occurred. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
       
        <div className="input-group">
        <label className="input-label">Username</label>
        <div className="input-wrapper">
        <i className="input-icon fas fa-user"></i> {/* Username icon */}
        <input
        className="input-field"
        type="text"
        value={username}
        placeholder="Enter your Username"
        onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        </div>

        <div className="input-group">
          <label className="input-label">Email</label>
          <div className="input-wrapper">
            <i className="input-icon fas fa-envelope"></i> {/* Email icon */}
            <input
              className="input-field"
              type="email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="input-wrapper">
            <i className="input-icon fas fa-lock"></i> {/* Password lock icon */}
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </button>
          </div>
        </div>

        <button className="register-button" type="submit">
          Register
        </button>

      </form>
      <p>
        <Link to="/login" className="login-link">User Login</Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Register;
