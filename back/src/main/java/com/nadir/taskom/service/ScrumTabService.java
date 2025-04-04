package com.nadir.taskom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nadir.taskom.model.ScrumTabs;
import com.nadir.taskom.repository.ScrumTabRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScrumTabService {
  
  private final ScrumTabRepository repository;

  public List<ScrumTabs> getAllScrumTabs() {
    return repository.findAll();
  }
}
