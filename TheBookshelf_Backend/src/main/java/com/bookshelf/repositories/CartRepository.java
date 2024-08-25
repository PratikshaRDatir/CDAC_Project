package com.bookshelf.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookshelf.entities.Book;
import com.bookshelf.entities.Cart;
import com.bookshelf.entities.User;

public interface CartRepository extends JpaRepository<Cart,Long> {

    //Optional<Cart> findByUserAndBook(User user,Book book);

    Optional<Cart> findByUser(User user);

}
