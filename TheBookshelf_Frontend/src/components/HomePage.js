import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage">
      <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
          <span className="brand-first-letter">T</span>he <span className="brand-first-letter">B</span>ookshelf
        </Link>      
          <div className="navbar-collapse collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5 text-center">
        <h1 className="display-4">Welcome to The Bookshelf</h1>
        <h2 className="lead">The Bookshelf : Where Every Story Finds a Home</h2>
        <Link to="/browseBookList" className="btn btn-primary btn-lg mt-3">Browse Books</Link>
      </div>
    </div>
  );
}

export default HomePage;