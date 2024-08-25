import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import CustomerPage from './components/CustomerPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/Contactus';
import AdminBookList from './components/AdminBookList';
import CustomerBookList from './components/CustomerBookList';
import BrowseBookList from './components/BrowseBookList';
import RegisterPage from './components/RegisterPage';
import LogoutPage from './components/LogoutPage';
import UpdateBookDetails from './components/UpdateBookDetails';
import AddBook from './components/AddBook';
import SearchBookById from './components/SearchBookById';
import SearchBookByCategory from './components/SearchBookByCategory';
import GetAllOrders from './components/GetAllOrders';
import GetOrderById from './components/GetOrderById';
import GetAllPayments from './components/GetAllPayments';
import AddBookToCart from './components/AddBookToCartPage';
import Cart from './components/Cart';
import RemoveBookFromCart from './components/RemoveBookFromCart';
import CancelOrderPage from './components/CancelOrderPage';
import PlaceOrderPage from './components/PlaceOrderPage'; 
import MakePaymentPage from './components/MakePaymentPage';



const App = () =>  {
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browseBookList" element={<BrowseBookList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/AddBookToCart" element={<AddBookToCart />} />
        <Route path="/RemoveBookFromCart" element={<RemoveBookFromCart />} />
        <Route path="/customerbooklist" element={<CustomerBookList />} />
        <Route path="/cart" element={<Cart userId={userId} />} /> 


        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerPage />}>
          <Route path="booklist" element={<CustomerBookList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<GetOrderById />} /> 
          <Route path="cancelOrder/:orderId" element={<CancelOrderPage />} /> 
          <Route path="placeOrder" element={<PlaceOrderPage />} />
          <Route path="makePayment" element={<MakePaymentPage />} /> 
          <Route path="logout" element={<LogoutPage />} />
        </Route>


        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="booklist" element={<AdminBookList />} />
          <Route path="add-new-book" element={<AddBook />} />
          <Route path="updateBookDetails/:id" element={<UpdateBookDetails />} />
          <Route path="search-book-by-id" element={<SearchBookById />} />
          <Route path="search-book-by-category" element={<SearchBookByCategory />} />
          <Route path="get-all-orders" element={<GetAllOrders />} />
          <Route path="get-order-by-id" element={<GetOrderById />} />
          <Route path="all-payments" element={<GetAllPayments />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>

      </Routes>
      
    </Router>
  );
};

export default App;
