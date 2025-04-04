package com.nadir.taskom.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class Home {

  @GetMapping("/")
  public String home() {
    return "Welcom, Taskom back";
  }
  
}
