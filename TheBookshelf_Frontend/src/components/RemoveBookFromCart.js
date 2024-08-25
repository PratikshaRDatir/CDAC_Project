import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './RemoveBookFromCart.css';

function RemoveBookFromCart() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');
  const bookId = searchParams.get('bookId');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId && bookId) {
      axios.delete(`http://localhost:8080/carts/${userId}/books/${bookId}`)
        .then(response => {
          if (response.status === 204) {
            setMessage('Book removed from cart successfully.');
          } else {
            setMessage('Failed to remove book from cart.');
          }
          setLoading(false);
        })
        .catch(err => {
          setError('Error removing book from cart: ' + err.message);
          setLoading(false);
        });
    }
  }, [userId, bookId]);

  const handleGoBack = () => {
    navigate('/customerBookList'); // Redirect to the book list or another relevant page
  };

  return (
    <div className="remove-book-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <p>{message}</p>
          <button onClick={handleGoBack} className="btn btn-primary">Back to Book List</button>
        </div>
      )}
    </div>
  );
}

export default RemoveBookFromCart;
