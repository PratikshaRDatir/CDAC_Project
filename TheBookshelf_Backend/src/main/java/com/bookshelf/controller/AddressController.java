package com.bookshelf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookshelf.entities.Address;
import com.bookshelf.exception.AddressNotNullException;
import com.bookshelf.service.AddressService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin

@RestController
@RequestMapping("/addresses")
public class AddressController {

	//dependency
	@Autowired
	private AddressService addressService;
	
	//save address
	@PostMapping
	 public ResponseEntity<Address> saveAddress( @RequestBody Address address) throws AddressNotNullException {
        Address savedAddress = addressService.saveAddress(address);
        return ResponseEntity.ok(savedAddress);
    }
	
	//get address by id
	 @GetMapping("/{id}")
	    public ResponseEntity<Address> getAddressById(@PathVariable Long id) {
	        Address address = addressService.getAddressById(id);
	        return ResponseEntity.ok(address);
	    }
	 
	 //update address
	 @PutMapping("/{id}")
	    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address address) {
	        Address updatedAddress = addressService.updateAddress(id, address);
	        return ResponseEntity.ok(updatedAddress);
	    }
	
	 //delete address
	 @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
	        addressService.deleteAddress(id);
	        return ResponseEntity.noContent().build();
	    }
}
