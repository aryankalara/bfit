package com.bfit.jfsd.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bfit.jfsd.springboot.model.FoodGoal;
import com.bfit.jfsd.springboot.model.User;
import com.bfit.jfsd.springboot.model.Workout;
import com.bfit.jfsd.springboot.service.FoodGoalService;
import com.bfit.jfsd.springboot.service.UserService;

import jakarta.mail.internet.MimeMessage;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private FoodGoalService foodGoalService;
    
    
    @Autowired
    private JavaMailSender mailSender;
    
    
    @PostMapping("/sendemail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) throws Exception {
        String name = emailRequest.getName();
        String toEmail = emailRequest.getEmail();
        String msg = emailRequest.getMessage();

        // Generate a random OTP
        int otp = (int) (Math.random() * 99999);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(toEmail);
        helper.setSubject("Contact Form Submission");
        helper.setFrom("2200030986cseh@gmail.com");
        String htmlContent =
            "<h3>Contact Form Details</h3>" +
            "<p><strong>Name:</strong> " + name + "</p>" +
            "<p><strong>Email:</strong> " + toEmail + "</p>" +
            "<p><strong>Message:</strong> " + msg + "</p>" +
            "<p><strong>OTP:</strong> " + otp + "</p>";
        helper.setText(htmlContent, true);
        mailSender.send(mimeMessage);

        // Return a success response
        return ResponseEntity.ok("Email Sent Successfully");
    }

    
    static class EmailRequest {
        private String name;
        private String email;
        private String message;

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
    
    
    
    
    
    
    

    @PostMapping("/adduser")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        if (user.getDob() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Date of birth (dob) is required.");
        }
        
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User created successfully");
    }

    @GetMapping("/checkuserlogin")
    public User checkUserLogin(@RequestParam("email") String email,@RequestParam("password") String pasword) 
    {
    	User u = userService.checkUserLogin(email, pasword);
    	
    	if(u!=null) {
    		return u;
    	}
    	else {
    		return null;
    	}
    }
    
    @GetMapping("/viewbyid")
    public User viewById(@RequestParam  int id)
    {
    	return userService.viewUserById(id);
    }
    
    @PutMapping("/updateuser")
    public String updateUser(@RequestBody User u)
    {
    	return userService.updateUser(u);
    }
    
    @PostMapping("/addworkout")
    public String addWorkout(@RequestBody Workout w)
    {
    	return userService.addWorkout(w);
    }
    
    
    
    @PostMapping("/foodgoals")
    public ResponseEntity<String> saveFoodGoal(@RequestBody FoodGoal foodGoal) {
        try {
          foodGoalService.saveFoodGoal(foodGoal);
            return ResponseEntity.ok("Food goal saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save food goal.");
        }
    }

    @GetMapping("/foodgoals/{date}")
    public ResponseEntity<FoodGoal> getFoodGoal(@PathVariable String date) {
        FoodGoal foodGoal = foodGoalService.getFoodGoalByDate(date);
        if (foodGoal != null) {
            return ResponseEntity.ok(foodGoal);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
    
    @GetMapping("/workouts")
    public List<Workout> viewall()
    {
    	return userService.viewallworkouts();
    }
    
    
    @GetMapping("/viewusers")
    public List<User> viewusers()
    {
    	return userService.viewallusers();
    }
    
    
    @DeleteMapping("/deleteuser")
    public String deleteuser(@RequestParam("id")  int id)
    {
    	return userService.deleteUser(id);
    }
    
    
    

    // Response model for success
    public static class LoginResponse {
        private String message;
        private User user;

        public LoginResponse(String message, User user) {
            this.message = message;
            this.user = user;
        }

        public String getMessage() {
            return message;
        }

        public User getUser() {
            return user;
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
