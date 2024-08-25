package com.bookshelf.controller;

import com.bookshelf.entities.Cart;
import com.bookshelf.exception.ResourceNotFoundException;
import com.bookshelf.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/{userId}/books/{bookId}")
    public ResponseEntity<Cart> addBookToCart(
            @PathVariable Long userId,
            @PathVariable Long bookId,
            @RequestParam int quantity) {
        try {
            Cart updatedCart = cartService.addBookToCart(userId, bookId, quantity);
            return ResponseEntity.ok(updatedCart);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getUserCart(@PathVariable Long userId) {
        try {
            Cart cart = cartService.getUserCart(userId);
            return ResponseEntity.ok(cart);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{userId}/books/{bookId}")
    public ResponseEntity<Cart> updateBookQuantity(
            @PathVariable Long userId,
            @PathVariable Long bookId,
            @RequestParam int quantity) {
        try {
            Cart updatedCart = cartService.updateBookQuantity(userId, bookId, quantity);
            return ResponseEntity.ok(updatedCart);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/books/{bookId}")
    public ResponseEntity<Void> removeBookFromCart(
            @PathVariable Long userId,
            @PathVariable Long bookId) {
        try {
            cartService.removeBookFromCart(userId, bookId);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
