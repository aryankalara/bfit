package com.bfit.jfsd.springboot.service;

import com.bfit.jfsd.springboot.model.Nutritionist;

public interface NutritionistService 
{
	public Nutritionist checkNutritionistLogin(String nemail,String npassword);
}
