package com.nadir.taskom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nadir.taskom.model.ScrumSteps;

@Repository
public interface ScrumStepRepository extends JpaRepository<ScrumSteps, Long> {

}

