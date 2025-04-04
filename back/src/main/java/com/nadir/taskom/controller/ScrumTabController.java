package com.nadir.taskom.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nadir.taskom.model.ScrumTabs;
import com.nadir.taskom.service.ScrumTabService;

import lombok.AllArgsConstructor;

@RestController
@SpringBootApplication
@AllArgsConstructor
public class ScrumTabController {

  private final ScrumTabService scrumTabService;

  @GetMapping("/get-scrumtabs")
  public List<ScrumTabs> getAllScrumTabs() {
    return scrumTabService.getAllScrumTabs();
  }
  
}
