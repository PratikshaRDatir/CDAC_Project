package com.bookshelf.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookshelf.entities.Address;
import com.bookshelf.exception.AddressNotFoundException;
import com.bookshelf.exception.AddressNotNullException;
import com.bookshelf.repositories.AddressRepository;

@Service
@Transactional
public class AddressServiceimpl implements AddressService{

	@Autowired
	private AddressRepository addressRepository;
	
	//add address if null
	@Override
	public Address saveAddress(Address address) throws AddressNotNullException {
		 if (address != null) {
	            throw new AddressNotNullException("Address must be null to add a new entry");
	            }
	        return addressRepository.save(address);
	}
	
	//update address 
	@Override
	public Address updateAddress(Long id, Address address) {
		 Optional<Address> existingAddressOpt = addressRepository.findById(id);
	        if (existingAddressOpt.isPresent()) {
	            Address existingAddress = existingAddressOpt.get();
	            existingAddress.setStreet(address.getStreet());
	            existingAddress.setCity(address.getCity());
	            existingAddress.setState(address.getState());
	            existingAddress.setCountry(address.getCountry());
	            existingAddress.setPincode(address.getPincode());
	            return addressRepository.save(existingAddress);
	        } else {
	            throw new RuntimeException("Address not found with id: " + id);
	        }
	}

	//delete address
	@Override
	public void deleteAddress(Long id) {
	    addressRepository.deleteById(id);
		
	}

	//get address by id
	@Override
	public Address getAddressById(Long id) {
        return addressRepository.findById(id).orElseThrow(() -> 
               new AddressNotFoundException("Address not found with id: " + id));

	}

	
}
