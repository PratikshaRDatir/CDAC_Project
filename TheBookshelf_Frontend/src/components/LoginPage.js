import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/login', null, {
        params: { email, password, role }
      });

      if (response.status === 200) {
        const { redirectUrl } = response.data;
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          setError('Unexpected response from server.');
        }
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  const handleForgotPassword = async () => {
    try {
      console.log('Sending OTP to:', emailForOtp); // Debugging log
      const response = await axios.post(
        'http://localhost:8080/users/forgot-password',
        { email: emailForOtp },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('OTP send response:', response); // Debugging log
      setOtpSent(true);
    } catch (err) {
      setOtpError('Failed to send OTP. Please try again.');
      console.error('OTP request error:', err.response || err);
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      console.log('Verifying OTP:', otp); // Debugging log
      const response = await axios.post('http://localhost:8080/users/verify-otp', { email: emailForOtp, otp });
      console.log('OTP verification response:', response); // Debugging log
      if (response.status === 200) {
        const { redirectUrl } = response.data;
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          setOtpError('Unexpected response from server.');
        }
      }
    } catch (err) {
      setOtpError('Invalid OTP. Please try again.');
      console.error('OTP verification error:', err.response || err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
      <div className="mt-3">
        <Link to="/register" className="btn btn-secondary">New to The Bookshelf? Register</Link>
        <button onClick={() => setShowForgotPassword(true)} className="btn btn-link">Forgot Password?</button>
      </div>

      {showForgotPassword && (
        <div className="forgot-password-container">
          {!otpSent ? (
            <div>
              <h3>Forgot Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-2"
                value={emailForOtp}
                onChange={(e) => setEmailForOtp(e.target.value)}
              />
              <button onClick={handleForgotPassword} className="btn btn-primary">Send OTP</button>
              {otpError && <p className="text-danger mt-2">{otpError}</p>}
            </div>
          ) : (
            <div>
              <h3>Enter OTP</h3>
              <input
                type="text"
                placeholder="Enter OTP"
                className="form-control mb-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerifyOtp} className="btn btn-primary">Verify OTP</button>
              {otpError && <p className="text-danger mt-2">{otpError}</p>}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 text-center">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
