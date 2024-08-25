package com.bookshelf.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
@ToString
@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;
	
	@Column(name = "order_status", nullable = false)
	private String status;
	
	@Column(name = "total_amount", nullable = false)
	private Double totalAmount;
	
	//order should have one to one relation
	@ManyToOne
    @JoinColumn(name = "cart_id")
	private Cart cart;

	@Column(name = "order_date" /*, nullable = false*/)
	private LocalDate orderDate;

	public Order(String status, Double totalAmount, Cart cart, LocalDate orderDate) {
		super();
		this.status = status;
		this.totalAmount = calculateTotalAmount();
		this.cart = cart;
		this.orderDate = LocalDate.now();
	}
	
	private double calculateTotalAmount() {
        if (cart == null || cart.getItems() == null) {
            return 0.0;
        }

        return cart.getItems().stream()
            .mapToDouble(entry -> entry.getBook().getPrice() * entry.getOrderQuantity())
            .sum();
    }

	 


	public void setOrderDate(LocalDate orderDate) {
	    this.orderDate = orderDate != null ? orderDate : LocalDate.now(); // Default to current date if null
	}
	

	
}
