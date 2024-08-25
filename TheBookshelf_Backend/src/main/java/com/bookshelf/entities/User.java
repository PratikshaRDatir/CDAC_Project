package com.bookshelf.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long userId;
	@Column(length = 20, name = "first_name") // first_name : varchar(20)
	private String firstName;
	@Column(length = 20, name = "last_name") // last_name : varchar(20)
	private String lastName;
	@Column(length = 30, unique = true) // unique constraint
	private String email;
	@Column(length = 20, nullable = false) // not null constraint
	private String password;
	@Column(name = "phone_no", length = 14, unique = true)
	private String phoneNo;
	@OneToOne(cascade =CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name = "address_id")
	private Address myAddress;
	@Enumerated(EnumType.STRING) // col type : varchar(20 : store enum constant names
	@Column(length = 20)
	private Role role;
	
}
