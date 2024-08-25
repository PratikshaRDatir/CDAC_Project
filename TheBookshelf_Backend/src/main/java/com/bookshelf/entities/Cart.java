package com.bookshelf.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
@Table(name="carts")
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartId;
	
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "cart_items", joinColumns = @JoinColumn(name = "cart_id"))
    private List<CartEntry> items = new ArrayList<>();

    // Inner class to represent the book and quantity
    @Embeddable
    public static class CartEntry {

        @ManyToOne
        @JoinColumn(name = "book_id")
        private Book book;

        @Column(name = "quantity")
        private int orderQuantity;

        public CartEntry() {
        }

        public CartEntry(Book book, int Orderquantity) {
            this.book = book;
            this.orderQuantity = orderQuantity;
        }

		public Book getBook() {
			return book;
		}

		public void setBook(Book book) {
			this.book = book;
		}

		public int getOrderQuantity() {
			return orderQuantity;
		}

		public void setOrderQuantity(int orderQuantity) {
			this.orderQuantity = orderQuantity;
		}


	
    }
	 
	 
	 
}
