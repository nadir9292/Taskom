package com.nadir.taskom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nadir.taskom.model.Users;
import com.nadir.taskom.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  
  private final UserRepository repository;

    public List<Users> getAllUsers() {
    return repository.findAll();
  }

}
