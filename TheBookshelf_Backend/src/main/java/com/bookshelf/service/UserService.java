package com.bookshelf.service;

import java.util.List;

import com.bookshelf.entities.User;

public interface UserService {

	
	User registerUser(User user);
	
	User loginUser(String email, String password);
	
	User updateUser(Long userId, User updatedUser);
	
	List<User> getAllUsers();
	
	User getUserById(Long userId);
	/*
	 * public List<User> getAllUser();
	 * 
	 * public Optional<User> getUserById(Long id);
	 * 
	 * 
	 * public User createUser(User user);
	 * 
	 * public User updateUser(Long id, User user);
	 * 
	 * public void deleteUser(Long id);
	 * 
	 * public User login(String email,String password) throws
	 * InvalidCredentialException;
	 */
	
	// public UserDTO registerUser(UserDTO userDTO);

	//UserDTO registerUser(UserRegistrationDTO userRegistrationDTO);
	 
	 
}