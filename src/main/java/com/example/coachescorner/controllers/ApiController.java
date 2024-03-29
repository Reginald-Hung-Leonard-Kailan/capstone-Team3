package com.example.coachescorner.controllers;


import com.example.coachescorner.model.ClientInformation;
import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.ClientInformationRepository;
import com.example.coachescorner.repositories.InformationTypeRepository;
import com.example.coachescorner.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class ApiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InformationTypeRepository infoTypeDao;
    @Autowired
    private ClientInformationRepository infoDao;

    @GetMapping
    public List<User> findAllUsers(){
        //Implement
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable(value = "id") long id) {
        Optional<User> user = Optional.ofNullable(userRepository.findById(id));

        if(user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public User saveUser(@Validated @RequestBody User user) {
//        Implement
        return userRepository.save(user);
    }


    @PostMapping("/{id}/details")
    public ClientInformation saveInfo(@Validated @RequestBody ClientInformation clientInformation, @PathVariable(value = "id") long id) {
        User user = userRepository.findById(id); //ensure we have an id for the infoType
        clientInformation.setUserId(user);
        System.out.println(clientInformation);
        return infoDao.save(clientInformation);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<List<ClientInformation>> clientInfo(@PathVariable(value = "id") long id) {
        User user = userRepository.findById(id);
        Optional<List<ClientInformation>> info = Optional.ofNullable(user.getClientInformationList());
        return ResponseEntity.ok().body(info.get());
    }

//    For deleting
@DeleteMapping("/{id}/details/{infoId}")
public ResponseEntity<Void> deleteInfo(@PathVariable(value = "id") long id, @PathVariable(value = "infoId") long infoId) {
    User user = userRepository.findById(id);
    Optional<ClientInformation> info = Optional.ofNullable(infoDao.findById(infoId));

    if (user == null || info.isEmpty() || !user.equals(info.get().getUserId())) {
        return ResponseEntity.notFound().build();
    }

    infoDao.delete(info.get());
    return ResponseEntity.noContent().build();
}

/**
 * Testing out the following JSON msg:
 * const csrfToken = document.querySelector('meta[name="_csrf"]').content;
 *         const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
 * var clientInformation = {
 *     clientInformation: "235",
 *     date: "2023-01-01",
 *     id: 6
 * };
 *
 * console.log(JSON.stringify(clientInformation));
 *
 * fetch('/api/user/4/details', {
 *     method: 'POST',
 *     headers: {
 *                 "Content-Type": "application/json",
 *                 [csrfHeader]: csrfToken
 *             },
 *     body: JSON.stringify(clientInformation)
 * })
 * .then(response => response.json())
 * .then(data => console.log(data))
 * .catch(error => console.error(error));
 */
//    @PostMapping("/msg")
//    public long loggingInfo(@RequestBody Map<String, Object> requestBody){
//        long id = Long.parseLong(requestBody.get("id").toString());
//        System.out.println(id);
//        return id;
//    }
}