import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CancelOrderPage.css';

const CancelOrderPage = () => {
  const { orderId } = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCancelOrder = () => {
    axios.delete(`http://localhost:8080/orders/${orderId}`)
      .then(() => {
        setSuccess('Order cancelled successfully');
        setError('');
        // Redirect to another page if needed, e.g., orders list
        navigate('/orders');
      })
      .catch(error => {
        setError('Failed to cancel order. Please try again.');
        setSuccess('');
      });
  };

  return (
    <div className="cancel-order-page">
      <h2>Cancel Order</h2>
      <p>Are you sure you want to cancel order ID {orderId}?</p>
      <button className="btn btn-danger" onClick={handleCancelOrder}>Confirm Cancellation</button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default CancelOrderPage;
