package com.bookshelf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin

@Controller //containing request handling logic
public class UserHomeController {

	//method to render loginpage
	@GetMapping("/")
	public String showLoginForm() {
		return "/users/login";
	}
}
