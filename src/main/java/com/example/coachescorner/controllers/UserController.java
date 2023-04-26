package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.InjuryRepository;
import com.example.coachescorner.repositories.UserClientRepository;
import com.example.coachescorner.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    private UserRepository userDao;

    private UserClientRepository userClientDao;

    private PasswordEncoder passwordDao;

    private InjuryRepository injuryDao;

    public UserController(UserRepository userDao, UserClientRepository userClientDao, PasswordEncoder passwordDao, InjuryRepository injuryDao) {
        this.userDao = userDao;
        this.userClientDao = userClientDao;
        this.passwordDao = passwordDao;
        this.injuryDao = injuryDao;
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
    public String saveUser(@Valid User user, Errors validation, @RequestParam(name = "role") boolean isCoach, Model model) {
        System.out.println("inside save user");
        if(validation.hasErrors()) {
            System.out.println("inside validation has error");
            model.addAttribute("errors", validation);
            model.addAttribute("user", user);
            return "register2";
        } else {

            String hash = passwordDao.encode(user.getPassword());
            user.setPassword(hash);
            user.setCoach(isCoach);
            if (user.getProfilePicture().length() < 5) {
                user.setProfilePicture("https://cdn.filestackcontent.com/rt98e0dMRMyqc7grZeHR");
            }
            userDao.save(user);
            return "redirect:/";
        }
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
        User user = userDao.findById(id);
        model.addAttribute("user", user);
        return "home";
    }

    @PostMapping("/edit/{id}")
    public String saveEditForm(@PathVariable long id, @RequestParam String firstname, @RequestParam String lastname, @RequestParam String email, @RequestParam String picture){
        User user = userDao.findById(id);
        user.setFirstName(firstname);
        user.setLastName(lastname);
        user.setEmail(email);
        user.setProfilePicture(picture);
        userDao.save(user);
        return "redirect:/home";
    }

    @GetMapping("/about")
    public String showAboutPage(){
        return "about";
    }

    @GetMapping("/stats")
    public String showStats(Model model){
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDao.findByUsername(userLogIn.getUsername());
//        if(id != user.getId()){
//            model.addAttribute("viewNum", id);
//            System.out.println("GET method sees attempt with: " + id);
//        } else {
//            model.addAttribute("viewNum", user.getId());
//            System.out.println("GET method DOES NOT see sticking with: " + user.getId());
//        }
        model.addAttribute("user", user);
        return "stats";
    }

//    @PostMapping("/stats")
//    public String hiddenViewer(Model model, @ModelAttribute("viewerNum") long id){
//        model.addAttribute("viewNum", id);
//        System.out.println("Post method sees attempt with: " + id);
//        return "stats";
//    }

    @GetMapping("/stats/{id}")
    public String customView(@PathVariable long id, Model model){
//        redirect.addAttribute("viewerNum", id);
        model.addAttribute("viewerNum", id);
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDao.findByUsername(userLogIn.getUsername());
        model.addAttribute("user", user);
        System.out.println(id);
        return "stats";
    }

    @GetMapping("/profile")
        public String showProfileView(Model model){
        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDao.findByUsername(userLogIn.getUsername());
        model.addAttribute("user", user);
        return "profile";
        }

}
