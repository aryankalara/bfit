package com.bfit.jfsd.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bfit.jfsd.springboot.model.Nutritionist;
import com.bfit.jfsd.springboot.repository.NutritionistRepository;

@Service
public class NutritionistServiceImpl implements NutritionistService
{

	@Autowired
	NutritionistRepository nutritionistRepository;
	
	public Nutritionist checkNutritionistLogin(String nemail, String npassword) 
	{
		
		return nutritionistRepository.checkNutritionistLogin(nemail, npassword);
	}

}
