package com.example.coachescorner.repositories;

import com.example.coachescorner.model.ClientInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientInformationRepository extends JpaRepository<ClientInformation, Long> {
    ClientInformation findById(long id);
}
