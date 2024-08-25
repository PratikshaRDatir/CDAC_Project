import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

const AddBook = () => {
    const [bookName, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [availableQty, setAvailableQty] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedOn, setPublishedOn] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            bookName,
            price,
            author,
            category,
            availableQty,
            publisher,
            publishedOn
        };

        try {
            const response = await axios.post('http://localhost:8080/books', newBook);

            if (response.status === 201) {
                alert('Book added successfully!');
                navigate('/admin/booklist'); // Redirect to the Book List page after adding the book
            }
        } catch (err) {
            setError('Failed to add the book. Please check the inputs and try again.');
            console.error(err);
        }
    };

    return (
        <div className="add-book-container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Book Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Available Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={availableQty}
                        onChange={(e) => setAvailableQty(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Publisher</label>
                    <input
                        type="text"
                        className="form-control"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Published On</label>
                    <input
                        type="date"
                        className="form-control"
                        value={publishedOn}
                        onChange={(e) => setPublishedOn(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default AddBook;
