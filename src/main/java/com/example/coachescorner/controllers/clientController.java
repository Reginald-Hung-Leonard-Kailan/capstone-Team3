package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.example.coachescorner.model.UserClient;
import com.example.coachescorner.repositories.UserClientRepository;
import com.example.coachescorner.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class clientController {

    private UserRepository userDao;

    private UserClientRepository clientsDao;

    public clientController(UserRepository userDao, UserClientRepository clientsDao) {
        this.userDao = userDao;
        this.clientsDao = clientsDao;
    }

    @GetMapping("/client")
    public String showClientsForm(Model model ){
        model.addAttribute("user", new User());
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User coach = userDao.findByUsername(userLogIn.getUsername());
        model.addAttribute("coach", coach);
        return "clients";
    }

    @PostMapping("/client")
    public String saveClientsForm(@ModelAttribute User user, @RequestParam(name = "role") boolean isClient, @RequestParam(name="isActive") boolean isActive){

        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User coach = userDao.findByUsername(userLogIn.getUsername());
        user.setCoach(isClient);
        User client = userDao.save(user);
        UserClient newClient = new UserClient();
        newClient.setClient(client);
        newClient.setCoach(coach);
        newClient.setActive(isActive);
        clientsDao.save(newClient);
        return "redirect:/home";
    }

    @GetMapping("/client-edit/{id}")
    public String showClientEditFrom(@PathVariable long id, Model model){
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User coach = userDao.findByUsername(userLogIn.getUsername());
        model.addAttribute("coach", coach);
        User user = userDao.findById(id);
        model.addAttribute("user", user);
        return "client-edit";
    }

    @PostMapping("/client-edit/{id}")
    public String saveClientEditForm(@PathVariable long id, @RequestParam String firstname, @RequestParam String lastname, @RequestParam String email, @RequestParam String picture){
        User client = userDao.findById(id);
        client.setFirstName(firstname);
        client.setLastName(lastname);
        client.setEmail(email);
        client.setProfilePicture(picture);
        userDao.save(client);
        return "redirect:/home";
    }

    @PostMapping("/client-false/{id}")
    public String removeRel(@PathVariable long id) throws JsonProcessingException {
        //getting the coach
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User coach = userDao.findByUsername(userLogIn.getUsername());

        //getting client
        User client = userDao.findById(id);

        //getting UserClient table
        UserClient userClient = clientsDao.findByCoachAndClient(coach, client);

        // set is_Active to false
        userClient.setActive(false);

        // save
        clientsDao.save(userClient);

        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(userClient));

        return "redirect:/home";
    }

}
