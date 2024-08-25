import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './PlaceOrderPage.css';

const PlaceOrderPage = () => {
  const [cartId, setCartId] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!cartId || !userId) {
      setError('Please enter valid Cart ID and User ID');
      return;
    }

    axios.post('http://localhost:8080/orders', { cartId }, { params: { userId } })
      .then(response => {
        setSuccess('Order placed successfully!');
        setError('');
      })
      .catch(error => {
        setError('Failed to place order. Please try again.');
        setSuccess('');
      });
  };

  const handleMakePayment = () => {
    // Redirect to the MakePaymentPage
    navigate('/customer/makePayment');
  };

  return (
    <div className="place-order-container">
      <h2>Place Your Order</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Cart ID"
          value={cartId}
          onChange={(e) => setCartId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handlePlaceOrder}>Place Order</button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>

      <div className="place-order-container">
      {/* Your existing form or order details here */}
      <button className="btn btn-primary" onClick={handleMakePayment}>Make Payment</button>
    </div>

    </div>
  );
};

export default PlaceOrderPage;