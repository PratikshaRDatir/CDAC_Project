package com.bookshelf.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.bookshelf.dto.OrderDTO;
import com.bookshelf.entities.Order;

public interface OrderService {
	
	
	 public List<Order> getAllOrder();
	 
	 public Optional<Order> findOrderById(Long id);
	 
	 public Order placeOrder(OrderDTO orderDTO, Long userId);
	 
	 public Order deleteOrderById(Long id) ;
	 
	 

}
