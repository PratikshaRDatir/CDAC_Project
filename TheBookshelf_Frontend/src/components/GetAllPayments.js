import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GetAllPayments.css';

const GetAllPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch all payments from the API
    axios.get('http://localhost:8080/payments/admin/all')
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the payments!', error);
      });
  }, []);

  return (
    <div className="payments-container">
      <h2>All Payments</h2>
      <Link to="/admin" className="back-button">Back to Admin Dashboard</Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>${payment.amount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.order.orderId}</td>
              <td>{payment.user.userId}</td>
              <td>{payment.paymentMode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllPayments;
