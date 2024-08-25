package com.bookshelf.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name="address")
public class Address {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
   private Long addressId;	
	@Column(length=100)
	private String street;
	@Column(length=100)
	private String city;
	@Column(length=100)
	private String state;
	@Column(length=100)
	private String country;
	@Column(length=100,name="pin_code")
	private String pincode;
	
	
	
}
