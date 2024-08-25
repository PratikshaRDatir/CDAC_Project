import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>Error fetching books: {error.message}</p>;
  }

  return (
    <div className="book-list">
      {/* Back to Home Button */}
      <Link to="/" className="btn btn-secondary back-to-home">
        Back to Home
      </Link>


      <h2>All Books</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
