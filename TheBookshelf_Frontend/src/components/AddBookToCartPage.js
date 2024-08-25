import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function AddBookToCart() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const bookId = searchParams.get('bookId');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = () => {
    axios.post(`http://localhost:8080/carts/${userId}/books/${bookId}`, null, {
      params: { quantity }
    })
      .then(response => {
        setMessage('Book added to cart successfully!');
        navigate('/customer');
      })
      .catch(error => {
        console.error('Error adding book to cart:', error);
        setMessage('Failed to add book to cart.');
      });
  };
  
  const handleBack = () => {
    navigate('/customer'); // Redirect to Customer Page
  };

  return (
    <div>
      <h2>Add Book to Cart</h2>
      <p>Book ID: {bookId}</p>
      <p>User ID: {userId}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <div style={{ marginTop: '10px' }}>  {/* Add some margin at the top */}
        <button onClick={handleAddToCart} style={{ marginRight: '10px' }}>
          Add to Cart
        </button>
        <button onClick={handleBack}>
          Back
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBookToCart;
