package com.nadir.taskom.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nadir.taskom.model.Users;
import com.nadir.taskom.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@SpringBootApplication
@AllArgsConstructor
public class UserController {
  
  private final UserService userService;

  @GetMapping("/get-users")
  public List<Users> getAllScrumUsers() {
    return userService.getAllUsers();
  }

}
