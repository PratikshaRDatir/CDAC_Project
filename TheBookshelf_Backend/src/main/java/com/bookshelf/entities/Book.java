package com.bookshelf.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "books")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_id", nullable = false)
	private Long bookId;

	@Column(name = "book_name", nullable = false)
	@NotBlank(message = "{book.name.notBlank}")
	private String bookName;

	@Column(name = "price", nullable = false)
	@NotNull(message = "{book.price.notNull}")
	private double price;

	@Column(name = "authors", nullable = false)
	@NotBlank(message = "{book.authors.notBlank}")
	private String author;

	//add book category

	@Column(name = "category", nullable = false)
	@NotBlank(message = "{book.category.notBlank}")
	private String category;
	
	@Column(name="available_qty",nullable = false)
    private int availableQty;

	@Column(name = "publisher", nullable = false)
	@NotBlank(message = "{book.publisher.notBlank}")
	private String publisher;

	@Column(name = "published_on", nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@NotNull(message = "{book.date.notNull}")
	private LocalDate publishedOn;
}
