package com.bookshelf.controller;

import com.bookshelf.dto.OrderDTO;
import com.bookshelf.entities.Order;
import com.bookshelf.service.OrderService;
import com.bookshelf.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrder();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Get an order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.findOrderById(id);
        if (order.isPresent()) {
            return new ResponseEntity<>(order.get(), HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Order not found with ID: " + id);
        }
    }

    // Place a new order
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody OrderDTO orderDTO, @RequestParam Long userId) {
        Order order = orderService.placeOrder(orderDTO, userId);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    // Delete an order by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
