package com.example.coachescorner.repositories;

import com.example.coachescorner.model.InformationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformationTypeRepository extends JpaRepository<InformationType, Long> {
    InformationType findById(long id);
}
