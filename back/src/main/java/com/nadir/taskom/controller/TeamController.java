package com.nadir.taskom.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nadir.taskom.model.Teams;
import com.nadir.taskom.service.TeamService;

import lombok.AllArgsConstructor;

@RestController
@SpringBootApplication
@AllArgsConstructor
public class TeamController {
  
  private final TeamService teamService;

  @GetMapping("/get-teams")
  public List<Teams> getAllScrumSteps() {
    return teamService.getAllTeams();
  }
}
