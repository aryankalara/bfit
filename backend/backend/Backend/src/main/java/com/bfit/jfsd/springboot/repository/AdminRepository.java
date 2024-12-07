package com.bfit.jfsd.springboot.repository;

import com.bfit.jfsd.springboot.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, String> {
    // Custom queries can be added here if needed
}