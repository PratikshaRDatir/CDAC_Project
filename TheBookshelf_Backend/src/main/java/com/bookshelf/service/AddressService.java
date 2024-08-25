package com.bookshelf.service;

import java.util.List;

import com.bookshelf.entities.Address;
import com.bookshelf.exception.AddressNotNullException;

public interface AddressService {

	    Address saveAddress(Address address) throws AddressNotNullException;
	 
	    Address updateAddress(Long id, Address address);
	    
	    void deleteAddress(Long id);
	    
	    Address getAddressById(Long id);
	    
	   // List<Address> getAllAddresses();
}
