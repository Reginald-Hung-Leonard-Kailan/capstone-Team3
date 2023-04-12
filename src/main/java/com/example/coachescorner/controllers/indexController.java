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
        return "redirect:/";
    }

    @PostMapping("/login")
    public String logUser( Model model, @RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
      User user= userDoa.findByUsername(username);

        if(user ==null){
        return "redirect:/";
        }
       boolean validattempt=false;
        if (password.equals(user.getPassword())){
            validattempt = true;
        }

        if(validattempt){
            model.addAttribute("coach", user);
            System.out.println("success");
            return "home";
        }else {
            System.out.println(username + password);
        }
        return "redirect:/";
    }

}
