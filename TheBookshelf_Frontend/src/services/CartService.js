import axios from 'axios';

// Function to add a book to the cart
export const addBookToCart = async (userId, bookId, quantity) => {
  try {
    const response = await axios.post(`/carts/${userId}/books/${bookId}`, null, {
      params: {
        quantity: quantity,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding book to cart:', error);
    throw error;
  }
};
