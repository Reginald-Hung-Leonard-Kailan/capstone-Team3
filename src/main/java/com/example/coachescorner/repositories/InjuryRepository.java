package com.example.coachescorner.repositories;

import com.example.coachescorner.model.Injury;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InjuryRepository extends JpaRepository<Injury, Long> {
    Injury findById(long id);
}
