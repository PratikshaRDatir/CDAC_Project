import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBookByCategory.css';

const ALLOWED_CATEGORIES = [
  'fiction', 
  'mythology', 
  'nonfiction', 
  'historical fiction', 
  'romance', 
  'short stories'
];

const SearchBookByCategory = () => {
  const [category, setCategory] = useState(ALLOWED_CATEGORIES[0]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);
    setBooks([]);

    axios.get(`http://localhost:8080/books/category/${category.toLowerCase()}`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        setError('Category not found or invalid category');
      });
  };

  const handleBackToBookList = () => {
    navigate('/admin/booklist'); // Navigate back to the Book List
  };

  return (
    <div className="search-category-container">
      <h2>Search Books By Category</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Select Category:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {ALLOWED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {books.length > 0 && (
        <div className="book-results">
          <h3>Books in "{category}" Category:</h3>
          <ul>
            {books.map(book => (
              <li key={book.bookId}>
                <strong>{book.bookName}</strong> by {book.author} - ${book.price}
              </li>
            ))}
          </ul>
          <button onClick={handleBackToBookList} className="btn btn-secondary">Back to Book List</button>
        </div>
      )}
    </div>
  );
};

export default SearchBookByCategory;
