package com.nadir.taskom.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nadir.taskom.model.Sprints;
import com.nadir.taskom.service.SprintService;

import lombok.AllArgsConstructor;

@RestController
@SpringBootApplication
@AllArgsConstructor
public class SprintController {
  
  private final SprintService sprintService;

  @GetMapping("/get-sprints")
    public List<Sprints> getAllScrumSprints() {
      try {
        return sprintService.getAllSprints();
      } catch (Exception e) {
        System.err.println("Erreur lors de la récupération des sprints : " + e.getMessage());
        e.printStackTrace();
        return List.of();
      }
    }
}
