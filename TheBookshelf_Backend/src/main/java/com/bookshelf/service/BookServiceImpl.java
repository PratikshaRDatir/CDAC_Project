package com.bookshelf.service;

import java.util.List;
import java.util.Locale.Category;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookshelf.entities.Book;
import com.bookshelf.exception.InvalidCredentialException;
import com.bookshelf.repositories.BookRepository;

@Service
public class BookServiceImpl implements BookService
{
	    @Autowired
	    private BookRepository bookRepository;

	    public List<Book> getAllBooks() {
	        return bookRepository.findAll();
	    }

	    public Book getBookById(Long id) {
	        return bookRepository.findById(id)
	                .orElseThrow(() -> new InvalidCredentialException("Book with id " + id + " not found"));
	    }

	    public Book addNewBook( Book newBook) {
	        return bookRepository.save(newBook);
	    }

	    public Book updateBook(Long id,  Book book) {
	        return bookRepository.findById(id)
	                .map(existingBook -> {
	                    existingBook.setBookName(book.getBookName());
	                    existingBook.setPrice(book.getPrice());
	                    existingBook.setAuthor(book.getAuthor());
	                    existingBook.setAvailableQty(book.getAvailableQty());
	                    existingBook.setPublisher(book.getPublisher());
	                    existingBook.setPublishedOn(book.getPublishedOn());
	                    existingBook.setCategory(book.getCategory());
	                    return bookRepository.save(existingBook);
	                })
	                .orElseThrow(() -> new InvalidCredentialException("Book with id " + id + " not found"));
	    }
	    
	    public List<Book> getBookByCategory(String category )
	    {
	    	return bookRepository.findBookByCategory(category);
	    }

	    public void deleteBook(Long id) {
	        Book book = bookRepository.findById(id)
	                .orElseThrow(() -> new InvalidCredentialException("Book with id " + id + " not found"));
	        bookRepository.delete(book);
	    }
	    
	
}
