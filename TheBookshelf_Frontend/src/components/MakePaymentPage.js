import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MakePaymentPage.css';

const MakePaymentPage = () => {
  const [orderId, setOrderId] = useState('');
  const [paymentMode, setPaymentMode] = useState('ONLINE_PAYMENT'); // Default value
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handlePayment = () => {
    if (!orderId) {
      setError('Please enter a valid Order ID');
      return;
    }

    axios.post('http://localhost:8080/payments', {
      orderId,
      userId: 1, // Replace with actual user ID
      paymentMode
    })
    .then(() => {
      navigate('/customer/orders'); // Redirect to Orders page or wherever you want
    })
    .catch(error => {
      setError('Payment failed: ' + error.message);
    });
  };

  return (
    <div className="make-payment-container">
      <h2>Make Payment</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="ONLINE_PAYMENT">Online Payment</option>
          <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
        </select>
        <button className="btn btn-primary" onClick={handlePayment}>Confirm Payment</button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MakePaymentPage;
