package com.nadir.taskom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nadir.taskom.model.Sprints;
import com.nadir.taskom.repository.SprintRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SprintService {
  
  private final SprintRepository repository;

  public List<Sprints> getAllSprints() {
    return repository.findAll();
  }
}
