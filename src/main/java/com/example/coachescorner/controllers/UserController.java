package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private UserRepository userDao;

    private PasswordEncoder passwordDao;

    public UserController(UserRepository userDao, PasswordEncoder passwordDao) {
        this.userDao = userDao;
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
        userDao.save(user);
        return "redirect:/";
    }
    @GetMapping("/home")
    public String showUserHomePage(Model model){
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDao.findByUsername(userLogIn.getUsername());
        model.addAttribute("user", user);
        return "home";
    }

    //profile update

    @GetMapping("/edit/{id}")
    public String showEditForm(Model model, @PathVariable long id){
//        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = userDao.findByUsername(userLogIn.getUsername());
        User user = userDao.findById(id);
        model.addAttribute("user", user);
        return "home";
    }

    @PostMapping("/edit/{id}")
    public String saveEditForm(@PathVariable long id, @RequestParam String firstname, @RequestParam String lastname, @RequestParam String email){
        User user = userDao.findById(id);
        user.setFirstName(firstname);
        user.setLastName(lastname);
        user.setEmail(email);
        userDao.save(user);
        return "redirect:/home";
    }

}
