package com.bookshelf.service;

import java.util.List;

import com.bookshelf.dto.PaymentDTO;
import com.bookshelf.entities.Payment;
import com.bookshelf.entities.PaymentMode;

public interface PaymentService {

	
	public void makePayment(Long orderId, Long userId, PaymentMode paymentMode) throws Exception;
	
	//public List<Payment> getPaymentsByUserId(Long userId);
	
	public List<Payment> getAllPayments();
}
