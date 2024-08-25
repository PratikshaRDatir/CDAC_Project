package com.bookshelf.service;

import com.bookshelf.entities.Order;
import com.bookshelf.entities.Payment;
import com.bookshelf.entities.PaymentMode;
import com.bookshelf.entities.User;
import com.bookshelf.repositories.OrderRepository;
import com.bookshelf.repositories.PaymentsRepository;
import com.bookshelf.repositories.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentsRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public void makePayment(Long orderId, Long userId, PaymentMode paymentMode) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        // Check if the user has the 'customer' role
        if (!user.getRole().equals("customer")) {
            throw new Exception("User is not authorized to make payments");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Order not found"));

        // Ensure the order is in a PENDING state before payment
        if (!"PENDING".equals(order.getStatus())) {
            throw new Exception("Order is not in a valid state for payment");
        }

        Payment payment = new Payment(order.getTotalAmount(), order, user, paymentMode);
        
        // Save the payment to the database
        paymentRepository.save(payment);

        // Update the order status to COMPLETED or PAID
        order.setStatus("PAID");
        orderRepository.save(order);
    }

        @Autowired
        private PaymentsRepository paymentsRepository;

        // Method for a customer to view their own payment details
		/*
		 * public List<Payment> getPaymentsByUserId(Long userId) { return
		 * paymentRepository.findByUserId(userId); }
		 */

        // Method for admin to view all payments made by customers
        public List<Payment> getAllPayments() {
            return paymentRepository.findAll();
        }
}
