package com.bookshelf.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookshelf.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
