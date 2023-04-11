package com.example.coachescorner.repositories;

import com.example.coachescorner.model.UserClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserClientRepository extends JpaRepository<UserClient, Long> {
    UserClient findById(long id);
}
