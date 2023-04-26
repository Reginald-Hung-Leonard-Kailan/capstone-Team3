package com.example.coachescorner.repositories;

import com.example.coachescorner.model.Injury;
import com.example.coachescorner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InjuryRepository extends JpaRepository<Injury, Long> {
    Injury findById(long id);

    Injury findByUser(User user);
}
