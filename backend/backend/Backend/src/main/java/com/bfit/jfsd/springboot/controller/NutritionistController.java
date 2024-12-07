package com.bfit.jfsd.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bfit.jfsd.springboot.model.Nutritionist;
import com.bfit.jfsd.springboot.service.NutritionistService;

@RestController
@RequestMapping("/nutritionist")
public class NutritionistController 
{
	@Autowired
	NutritionistService nutritionistService;
	
	
	
	@GetMapping("/checknutrionistlogin")
    public Nutritionist checkUserLogin(@RequestParam("email") String email,@RequestParam("password") String pasword) 
    {
    	Nutritionist n = nutritionistService.checkNutritionistLogin(email, pasword);
    	
    	if(n!=null) {
    		return n;
    	}
    	else {
    		return null;
    	}
    }
}
