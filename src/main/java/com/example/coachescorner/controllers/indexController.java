package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class indexController {

    private UserRepository userDoa;

    public indexController(UserRepository userDoa) {
        this.userDoa = userDoa;
    }

    @GetMapping("/")
    public String userSignUp(Model model){
        model.addAttribute("user", new User());
        return "index";
    }
    @GetMapping("/home")
    public String redirect(){
        return "redirect:/";
    }

    @PostMapping("/register")
    public String saveUser(@ModelAttribute User user, @RequestParam(name = "role") boolean isCoach, Model model) {
        user.setCoach(isCoach);
        userDoa.save(user);
        return "home";
    }

}
