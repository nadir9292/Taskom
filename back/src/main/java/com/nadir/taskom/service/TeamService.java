package com.nadir.taskom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nadir.taskom.model.Teams;
import com.nadir.taskom.repository.TeamRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TeamService {
  
  private TeamRepository repository;

    public List<Teams> getAllTeams() {
    return repository.findAll();
  }
}
