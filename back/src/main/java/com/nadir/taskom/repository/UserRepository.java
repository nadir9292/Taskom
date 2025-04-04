package com.nadir.taskom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nadir.taskom.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long>{
  
}
