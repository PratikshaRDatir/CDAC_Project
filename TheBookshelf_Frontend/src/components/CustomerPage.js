import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerPage.css';


const CustomerPage = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Customer Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="bookList">Book List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="cart">Cart</Link> {/* Add this line */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="orders">See Your Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="placeOrder">Place Your Order</Link> {/* New link */}
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

export default CustomerPage;
