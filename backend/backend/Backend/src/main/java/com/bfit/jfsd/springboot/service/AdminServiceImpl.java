package com.bfit.jfsd.springboot.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bfit.jfsd.springboot.model.Admin;
import com.bfit.jfsd.springboot.model.Nutritionist;
import com.bfit.jfsd.springboot.repository.AdminRepository;
import com.bfit.jfsd.springboot.repository.NutritionistRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private NutritionistRepository nutritionistRepository;

    // Admin login
    @Override
    public Admin adminLogin(String username, String password) {
        // Assuming only one admin in the system
        Admin admin = adminRepository.findById(username).orElse(null);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        }
        return null;
    }

    // Get admin details (since there's only one admin)
    @Override
    public Admin getAdmin() {
        return adminRepository.findById("admin1").orElse(null); // Assuming "admin1" is the only admin
    }

	@Override
	public String addNutrionist(Nutritionist nutritionist) {
        // Check if the email already exists
        if (nutritionistRepository.existsById(nutritionist.getEmail())) {
            return "Error: A nutritionist with this email already exists.";
        }

        // Hash the default password (if not already hashed)
        if (nutritionist.getPassword() == null || nutritionist.getPassword().equals("bfit")) {
            nutritionist.setPassword(hashPassword("bfit"));
        }

        // Save the nutritionist object to the database
        nutritionistRepository.save(nutritionist);
        return "Nutritionist added successfully!";
    }

	private String hashPassword(String password) {
        // Implement your password hashing logic here
        // For demonstration purposes, I'll just return the password as is
        return password;
    }
    
    
}