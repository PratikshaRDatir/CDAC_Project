import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBookById.css';

const SearchBookById = () => {
    const [bookId, setBookId] = useState('');
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/books/${bookId}`);
            setBook(response.data);
        } catch (err) {
            setError('Book not found. Please enter a valid ID.');
            setBook(null);
        }
    };

    const handleBackToBookList = () => {
        navigate('/admin/booklist'); // Navigate back to the Book List
      };

    return (
        <div className="search-book-container">
            <h2>Search Book By ID</h2>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label>Book ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}

            {book && (
                <div className="book-details mt-4">
                    <h3>Book Details</h3>
                    <p><strong>Book Name:</strong> {book.bookName}</p>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Price:</strong> ${book.price}</p>
                    <p><strong>Category:</strong> {book.category}</p>
                    <p><strong>Available Quantity:</strong> {book.availableQty}</p>
                    <p><strong>Publisher:</strong> {book.publisher}</p>
                    <p><strong>Published On:</strong> {book.publishedOn}</p>
                    <button onClick={handleBackToBookList} className="btn btn-secondary">Back to Book List</button> {/* Back button */}

                </div>
            )}
        </div>
    );
};

export default SearchBookById;
