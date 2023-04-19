package com.example.coachescorner.repositories;

import com.example.coachescorner.model.User;
import com.example.coachescorner.model.UserClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserClientRepository extends JpaRepository<UserClient, Long> {
    UserClient findById(long id);

    UserClient findByCoachAndClient(User coach, User client);
}
