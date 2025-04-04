package com.nadir.taskom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nadir.taskom.model.ScrumSteps;
import com.nadir.taskom.repository.ScrumStepRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScrumStepService {

  private final ScrumStepRepository repository;

  public List<ScrumSteps> getAllScrumSteps() {
    return repository.findAll();
  }
  
}
