package com.bookshelf.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookshelf.entities.Book;
import com.bookshelf.entities.Cart;
import com.bookshelf.entities.Cart.CartEntry;
import com.bookshelf.entities.User;
import com.bookshelf.exception.ResourceNotFoundException;
import com.bookshelf.repositories.BookRepository;
import com.bookshelf.repositories.CartRepository;
import com.bookshelf.repositories.UserRepository;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Cart addBookToCart(Long userId, Long bookId, int quantity) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(bookId).orElseThrow(() ->
                new ResourceNotFoundException("Book not found"));

        // Find or create a cart for the user
        Cart cart = cartRepository.findByUser(user).stream()
                .findFirst()
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // Find existing CartEntry or create a new one
        CartEntry existingEntry = cart.getItems().stream()
                .filter(entry -> entry.getBook().equals(book))
                .findFirst()
                .orElse(null);

        if (existingEntry != null) {
            existingEntry.setOrderQuantity(existingEntry.getOrderQuantity() + quantity);
        } else {
            CartEntry newEntry = new CartEntry(book, quantity);
            cart.getItems().add(newEntry);
        }

        return cartRepository.save(cart);
    }

    @Override
    public Cart getUserCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));

        Optional<Cart> carts = cartRepository.findByUser(user);
        if (carts.isEmpty()) {
            throw new ResourceNotFoundException("Cart not found");
        }
        return carts.get(); // Assuming only one cart per user
    }

    @Override
    @Transactional // Ensures that all operations happen within a transaction
    public Cart updateBookQuantity(Long userId, Long bookId, int quantity) {
        // Retrieve the user and book from their respective repositories
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(bookId).orElseThrow(() ->
                new ResourceNotFoundException("Book not found"));

        // Retrieve the user's cart
        Cart cart = cartRepository.findByUser(user).stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart not found"));

        // Retrieve the CartEntry associated with the book
        CartEntry entry = cart.getItems().stream()
                .filter(e -> e.getBook().equals(book))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        // Update the order quantity in the CartEntry
        entry.setOrderQuantity(quantity);

        // Persist the updated cart
        return cartRepository.save(cart);
    }


    @Override
    public void removeBookFromCart(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(bookId).orElseThrow(() ->
                new ResourceNotFoundException("Book not found"));

        Cart cart = cartRepository.findByUser(user).stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart not found"));

        CartEntry entry = cart.getItems().stream()
                .filter(e -> e.getBook().equals(book))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        cart.getItems().remove(entry);

        cartRepository.save(cart);
    }
}
