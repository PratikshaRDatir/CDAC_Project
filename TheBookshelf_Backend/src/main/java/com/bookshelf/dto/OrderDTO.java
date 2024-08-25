package com.bookshelf.dto;
import com.bookshelf.entities.Order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO {
    private Long cartId;
   // private Long bookId;
    
    private String orderStatus; 
    private double totalAmount; 

    public OrderDTO(Order order) {
        this.cartId = order.getCart().getCartId();
        this.orderStatus = order.getStatus();
        this.totalAmount = calculateTotalAmount(order);
    }

    private double calculateTotalAmount(Order order) {
        if (order.getCart() == null || order.getCart().getItems() == null) {
            return 0.0;
        }
        return order.getCart().getItems().stream()
            .mapToDouble(entry -> entry.getBook().getPrice() * entry.getOrderQuantity())
            .sum();
    }
   
}