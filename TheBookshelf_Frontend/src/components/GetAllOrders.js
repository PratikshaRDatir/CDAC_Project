import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetAllOrders.css';

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the API
    axios.get('http://localhost:8080/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Cart ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.cart.cartId}</td> {/* Accessing cartId from the cart object */}
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>{order.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllOrders;
