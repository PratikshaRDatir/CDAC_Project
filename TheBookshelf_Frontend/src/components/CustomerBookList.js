import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

function CustomerBookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleAddToCart = (bookId) => {
    const userId = 1; // Replace with the actual logged-in user ID
    axios.post(`http://localhost:8080/carts/${userId}`, { quantity: 1 })
        .then(response => {
            alert('Book added to cart successfully!');
        })
        .catch(error => {
            console.error('Error adding book to cart:', error);
            alert('Failed to add book to cart');
        });
};

const handleRemoveFromCart = (bookId) => {
  const userId = 1; // Replace with the actual logged-in user ID
  axios.delete(`http://localhost:8080/${userId}/books/${bookId}`)
      .then(response => {
          alert('Book removed from cart successfully!');
      })
      .catch(error => {
          console.error('Error removing book from cart:', error);
          alert('Failed to remove book from cart');
      });
};

  // if (loading) {
  //   return <p>Loading books...</p>;
  // }

  // if (error) {
  //   return <p>Error fetching books: {error.message}</p>;
  // }

  return (
    <div className="book-list">
      <h2>All Books (Customer)</h2>
      <div className="book-container">
        {books.map(book => (
          <div className="book-card" key={book.bookId}>
            <img
              src={book.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtTwTX073b4hbLtn-DxvVvliCUsxbx2hYXnQ&s'}
              alt={book.bookName}
              className="book-image"
            />
            <h3>{book.bookName}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Available Quantity:</strong> {book.availableQty}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Published On:</strong> {new Date(book.publishedOn).toLocaleDateString()}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleAddToCart(book.bookId)}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveFromCart(book.bookId)}
            >
              Remove from Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerBookList;
