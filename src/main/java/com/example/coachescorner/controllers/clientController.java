package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.example.coachescorner.model.UserClient;
import com.example.coachescorner.repositories.UserClientRepository;
import com.example.coachescorner.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

}
