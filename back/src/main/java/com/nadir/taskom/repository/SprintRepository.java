package com.nadir.taskom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nadir.taskom.model.Sprints;

@Repository
public interface SprintRepository extends JpaRepository<Sprints, Long> {
  
}
