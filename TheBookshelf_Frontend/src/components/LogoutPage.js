import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        console.log('Attempting logout...');
        const response = await axios.post('http://localhost:8080/users/logout');
        console.log('Logout response:', response);
        if (response.status === 200) {
          console.log('Logout successful, redirecting to home page...');
          navigate('/'); // Redirect to the home page
        } else {
          console.error('Unexpected response from server:', response);
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default LogoutPage;
