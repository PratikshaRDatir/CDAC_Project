import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateBookDetails.css';

const UpdateBookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({
    availableQty: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/books/${id}`)
      .then(response => {
        const { availableQty, price } = response.data;
        setBookDetails({ availableQty, price });
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/books/${id}`, bookDetails)
      .then(response => {
        alert('Book details updated successfully!');
        navigate('/admin/BookList'); // Redirect to the book list page after update
      })
      .catch(error => {
        console.error('There was an error updating the book details!', error);
      });
  };

  return (
    <div className="update-book-container">
      <h2>Update Book Details</h2>
      <form onSubmit={handleUpdateBook}>
        <div className="form-group">
          <label>Available Quantity:</label>
          <input
            type="number"
            className="form-control"
            name="availableQty"
            value={bookDetails.availableQty}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={bookDetails.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBookDetails;
