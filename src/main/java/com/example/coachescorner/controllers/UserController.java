package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    private UserRepository userDoa;

    private PasswordEncoder passwordDao;

    public UserController(UserRepository userDoa, PasswordEncoder passwordDao) {
        this.userDoa = userDoa;
        this.passwordDao = passwordDao;
    }

    @GetMapping("/")
    public String landingPage(Model model){
        return "index";
    }

    @GetMapping("/register")
    public String showRegisterForm(Model model){
        model.addAttribute("user", new User());
        return "register2";
    }

//    @GetMapping("/home")
//    public String redirect(){
//        return "redirect:/";
//    }

    @PostMapping("/register")
    public String saveUser(@ModelAttribute User user, @RequestParam(name = "role") boolean isCoach) {
        String hash = passwordDao.encode(user.getPassword());
        user.setPassword(hash);
        user.setCoach(isCoach);
        userDoa.save(user);
        return "redirect:/";
    }
    @GetMapping("/home")
    public String showUserHomePage(Model model){
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(userLogIn.getUsername());
        User user = userDoa.findByUsername(userLogIn.getUsername());
        model.addAttribute("user", user);
        return "home";
    }

}
