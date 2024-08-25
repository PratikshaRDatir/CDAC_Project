package com.bookshelf.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookshelf.entities.Payment;

public interface PaymentsRepository extends JpaRepository<Payment, Long> {

	
	// Find payments by user ID
//	List<Payment> findByUserId(Long userId);

    // Find all payments (optional if already provided by JpaRepository)
    List<Payment> findAll();

	
}
