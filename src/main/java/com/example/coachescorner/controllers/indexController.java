package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class indexController {
    @GetMapping("/")
    public String userSignUp(Model model){
        model.addAttribute("user", new User());

        return "index";
    }
    @GetMapping("/home")
    public String redirect(){
        return "redirect:/";
    }

    @PostMapping("/home")
    public String saveUser(@ModelAttribute User user, @RequestParam(name = "role") boolean isCoach, Model model) {
        user.setCoach(isCoach);
//        System.out.println(user.getFirstName());
//        System.out.println(user.getLastName());
//        System.out.println(user.getEmail());
//        System.out.println(user.getUsername());
//        System.out.println(user.getPassword());
        System.out.println(user.getIsCoach());

        return "home";
    }

}
