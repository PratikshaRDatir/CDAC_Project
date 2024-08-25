package com.bookshelf.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bookshelf.dto.OrderDTO;
import com.bookshelf.entities.Book;
import com.bookshelf.entities.Cart;
import com.bookshelf.entities.Order;
import com.bookshelf.entities.User;
import com.bookshelf.exception.ResourceNotFoundException;
import com.bookshelf.exception.UnauthorizedException;
import com.bookshelf.repositories.BookRepository;
import com.bookshelf.repositories.CartRepository;
import com.bookshelf.repositories.OrderRepository;
import com.bookshelf.repositories.UserRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    public Optional<Order> findOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order placeOrder(OrderDTO orderDTO, Long userId) {
      
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findById(orderDTO.getCartId()).orElseThrow(() ->
                new ResourceNotFoundException("Cart not found"));
        
        // Calculate total amount
        double totalAmount = cart.getItems().stream()
                .mapToDouble(item -> item.getBook().getPrice() * item.getOrderQuantity())
                .sum();

        // Create and populate a new Order entity
        Order newOrder = new Order();
        newOrder.setCart(cart);
        newOrder.setStatus("Pending"); 
        newOrder.setOrderDate(LocalDate.now());
        newOrder.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(newOrder);
        savedOrder.setStatus("Completed");
        return orderRepository.save(savedOrder);
    }
    
    
    public Order deleteOrderById(Long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (!orderOptional.isPresent()) {
            throw new RuntimeException("Order with ID " + id + " not found");
        }
        Order order = orderOptional.get();
        orderRepository.deleteById(id);
        return order;
    }
}

