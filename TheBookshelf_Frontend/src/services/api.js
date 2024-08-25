import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const login = (credentials) => api.post('/login', credentials);
export const getBooks = () => api.get('/books');
export const getCart = () => api.get('/cart');
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const getOrders = () => api.get('/orders');
export const getPayments = () => api.get('/payments');
