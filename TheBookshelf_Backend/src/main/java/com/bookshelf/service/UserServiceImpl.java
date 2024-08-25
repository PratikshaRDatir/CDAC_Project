package com.bookshelf.service;

import com.bookshelf.entities.User;
import com.bookshelf.repositories.UserRepository;
import com.bookshelf.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {
        if (user.getRole() == Role.ADMIN) {
            throw new IllegalArgumentException("Cannot register an admin.");
        }
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        user.setRole(Role.CUSTOMER); // Set role as customer by default
        return userRepository.save(user);
    }

    // Login User
    public User loginUser(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials."));
        
        if (user.getRole() == Role.CUSTOMER) {
            // Redirect to customer page logic
        } else if (user.getRole() == Role.ADMIN) {
            // Redirect to admin page logic
        }
        return user;
    }

    // Update User
    public User updateUser(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        
        // Update the necessary fields
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPassword(updatedUser.getPassword());
        user.setPhoneNo(updatedUser.getPhoneNo());
        user.setMyAddress(updatedUser.getMyAddress());
        
        // Keep the role as CUSTOMER by default
        user.setRole(Role.CUSTOMER);
        
        return userRepository.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User by ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }
}
