import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentDetails() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/api/payments')
      .then(response => setPayments(response.data))
      .catch(error => console.error('Error fetching payment details:', error));
  }, []);

  return (
    <div>
      <h2>Payment Details</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>
            Payment ID: {payment.id}, Amount: ${payment.amount}, Date: {payment.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentDetails;
