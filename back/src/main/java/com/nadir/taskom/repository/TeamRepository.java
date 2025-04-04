package com.nadir.taskom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nadir.taskom.model.Teams;

@Repository
public interface TeamRepository extends JpaRepository<Teams, Long>{
  
}
