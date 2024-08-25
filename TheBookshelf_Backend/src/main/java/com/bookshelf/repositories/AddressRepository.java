package com.bookshelf.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookshelf.entities.Address;

public interface AddressRepository extends JpaRepository<Address,Long> {

}
