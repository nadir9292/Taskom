package com.nadir.taskom.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nadir.taskom.model.ScrumSteps;
import com.nadir.taskom.service.ScrumStepService;

import lombok.AllArgsConstructor;


@RestController
@SpringBootApplication
@AllArgsConstructor
public class ScrumStepController {

  private final ScrumStepService scrumStepService;

  @GetMapping("/get-scrumsteps")
  public List<ScrumSteps> getAllScrumSteps() {
    return scrumStepService.getAllScrumSteps();
  }
}
