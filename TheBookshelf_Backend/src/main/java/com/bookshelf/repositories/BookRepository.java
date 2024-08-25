package com.bookshelf.repositories;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookshelf.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findBookByCategory(String category);

	//add validation for if no such category throw exception

}
