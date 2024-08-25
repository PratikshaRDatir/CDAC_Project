package com.bookshelf.service;

import java.util.List;
import java.util.Locale.Category;

import javax.validation.Valid;

import com.bookshelf.entities.Book;

public interface BookService {

   public List<Book> getAllBooks();

   public Book getBookById(Long id);

   public Book addNewBook(Book newbook);

   public Book updateBook(Long id,Book book);

   public void deleteBook(Long id);
   
   public List<Book> getBookByCategory(String category );
}
