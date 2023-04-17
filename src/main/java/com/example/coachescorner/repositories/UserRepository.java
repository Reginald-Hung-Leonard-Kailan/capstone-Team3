package com.example.coachescorner.repositories;

import com.example.coachescorner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    User findById(long id);

    List<User> findByFirstNameContainingIgnoreCase(String firstName);
}
