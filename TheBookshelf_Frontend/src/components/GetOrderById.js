import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GetOrderById.css';

const GetOrderById = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFetchOrder = () => {
    if (!orderId) {
      setError('Please enter a valid Order ID');
      return;
    }

    axios.get(`http://localhost:8080/orders/${orderId}`)
      .then(response => {
        setOrder(response.data);
        setError('');
      })
      .catch(error => {
        setError('Order not found. Please check the Order ID.');
        setOrder(null);
      });
  };

  const handleCancelOrder = () => {
    if (!orderId) {
      setError('Please enter a valid Order ID to cancel');
      return;
    }

    axios.delete(`http://localhost:8080/orders/${orderId}`)
      .then(() => {
        navigate('/customerPage'); // Redirect to Customer Page after cancellation
      })
      .catch(error => {
        setError('Failed to cancel order. Please try again.');
      });
  };

  return (
    <div className="order-by-id-container">
      <h2>Get Order By ID</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleFetchOrder}>Fetch Order</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {order && (
        <div className="order-details">
          <h3>Order Details</h3>
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>{order.orderId}</td>
              </tr>
              <tr>
                <th>Cart ID</th>
                <td>{order.cart.cartId}</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>${order.totalAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{order.status}</td>
              </tr>
              <tr>
                <th>Order Date</th>
                <td>{order.orderDate}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-danger" onClick={handleCancelOrder}>Cancel Order</button>
        </div>
      )}
    </div>
  );
};

export default GetOrderById;
