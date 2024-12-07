package com.bfit.jfsd.springboot.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bfit.jfsd.springboot.model.Admin;
import com.bfit.jfsd.springboot.model.Nutritionist;
import com.bfit.jfsd.springboot.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    

    @PostMapping(value = "/add-nutritionist", consumes = "multipart/form-data")
    public String addNutritionist(@RequestParam("fullName") String fullName,
                                 @RequestParam("email") String email,
                                 @RequestParam("phone") String phone,
                                 @RequestParam("dob") String dob,
                                 @RequestParam("gender") String gender,
                                 @RequestParam("profileImage") MultipartFile profileImage,
                                 @RequestParam("qualifications") List<String> qualifications,
                                 @RequestParam("experience") Integer experience,
                                 @RequestParam("licenseNumber") String licenseNumber,
                                 @RequestParam("specializations") List<String> specializations,
                                 @RequestParam("servicesOffered") List<String> servicesOffered,
                                 @RequestParam("consultationFee") Double consultationFee,
                                 @RequestParam("consultationModes") List<String> consultationModes,
                                 @RequestParam("languages") List<String> languages,
                                 @RequestParam("clinicAddress") String clinicAddress,
                                 @RequestParam("workingHours") String workingHours,
                                 @RequestParam("availableDays") List<String> availableDays,
                                 @RequestParam("bio") String bio,
                                 @RequestParam("linkedin") String linkedin,
                                 @RequestParam("twitter") String twitter) {
        
        Nutritionist nutritionist = new Nutritionist();
        nutritionist.setFullName(fullName);
        nutritionist.setEmail(email);
        nutritionist.setPhone(phone);
        nutritionist.setDateOfBirth(LocalDate.parse(dob));
        nutritionist.setGender(gender);
        // Handle the profileImage upload and set the profileImage field
        nutritionist.setQualifications(qualifications);
        nutritionist.setYearsOfExperience(experience);
        nutritionist.setLicenseNumber(licenseNumber);
        nutritionist.setSpecializations(specializations);
        nutritionist.setServicesOffered(servicesOffered);
        nutritionist.setConsultationFee(consultationFee);
        nutritionist.setConsultationModes(consultationModes);
        nutritionist.setLanguages(languages);
        nutritionist.setClinicAddress(clinicAddress);
        nutritionist.setWorkingHours(workingHours);
        nutritionist.setAvailableDays(availableDays);
        nutritionist.setBio(bio);
        nutritionist.setLinkedInUrl(linkedin);
        nutritionist.setTwitterUrl(twitter);

        return adminService.addNutrionist(nutritionist);
    }
    // Admin Login
    @GetMapping("/login")
    public ResponseEntity<Object> adminLogin(@RequestParam("username") String username, 
                                              @RequestParam("password") String password) {
        Admin admin = adminService.adminLogin(username, password);

        if (admin != null) {
            return ResponseEntity.ok(new LoginResponse("Login successful", admin));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid credentials"));
        }
    }

    // View admin details (Since there's only one admin, it's a fixed username)
    @GetMapping("/view")
    public ResponseEntity<Admin> viewAdmin() {
        Admin admin = adminService.getAdmin();

        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    // Response model for success
    public static class LoginResponse {
        private String message;
        private Admin admin;

        public LoginResponse(String message, Admin admin) {
            this.message = message;
            this.admin = admin;
        }

        public String getMessage() {
            return message;
        }

        public Admin getAdmin() {
            return admin;
        }
    }

    // Response model for error
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}