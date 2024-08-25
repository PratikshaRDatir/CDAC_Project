// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Cart() {
  const { userId } = useParams(); 
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    if (userId) { // Check if userId is defined
      axios.get(`http://localhost:8080/carts/${userId}`)
      .then(response => setCartItems(response.data.items))
        .catch(error => console.error('Error fetching cart items:', error));
    }
  }, [userId]);

  /*if (!cart) {
    return <div>Loading...</div>; // Loading state
  }

  if (cart.items.length === 0) {
    return <div>Your cart is empty.</div>; // Empty cart state
  }
*/
  return (
    <div>
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Cart ID </th>  
            <th>Order Quantity</th>
            <th>Book ID</th>
            <th>Book Title</th>

          </tr>
        </thead>
       
      
      </table>
    </div>
  );
}

export default Cart;
