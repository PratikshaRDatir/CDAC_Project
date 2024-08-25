package com.bookshelf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookshelf.dto.PaymentDTO;
import com.bookshelf.entities.Payment;
import com.bookshelf.entities.PaymentMode;
import com.bookshelf.service.PaymentService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
@RestController
@RequestMapping("/payments")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/payments")
	public void processUserPayment(Long orderId, Long userId, PaymentMode paymentMode) {
	    try {
	        paymentService.makePayment(orderId, userId, paymentMode);
	        System.out.println("Payment successful!");
	    } catch (Exception e) {
	        System.out.println("Payment failed: " + e.getMessage());
	    }
	}
	
	
	// Endpoint for admin to view all payments made by customers
	
    @GetMapping("/admin/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }
	
}
