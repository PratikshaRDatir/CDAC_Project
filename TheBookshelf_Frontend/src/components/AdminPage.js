import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="booklist">Manage Books</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="add-new-book">Add New Book</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="search-book-by-id">Search Book By Id</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="search-book-by-category">Search Book By Category</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="get-all-orders">Get All Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="get-order-by-id">Get Order By ID</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="all-payments">All Payments</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="logout">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
