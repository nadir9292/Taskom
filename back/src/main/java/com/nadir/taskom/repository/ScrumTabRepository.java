package com.nadir.taskom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nadir.taskom.model.ScrumTabs;

@Repository
public interface ScrumTabRepository extends JpaRepository<ScrumTabs, Long> {
  
}
