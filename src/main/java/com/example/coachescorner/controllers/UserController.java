package com.example.coachescorner.controllers;

import com.example.coachescorner.model.User;
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

    public UserController(UserRepository userDao, UserClientRepository userClientDao, PasswordEncoder passwordDao) {
        this.userDao = userDao;
        this.userClientDao = userClientDao;
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

//    @GetMapping("/users/search")
//    public String showClients (@RequestParam String name, Model model){
//
//        // coach login
//
//        User userLogIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User coach = userDao.findById(userLogIn.getId());
//
//        // check for relationship
//       List<UserClient> users = coach.getClients();
//
//       List<User> clients = new ArrayList<>();
//
//       for (UserClient client : users) {
//            User user = client.getClient();
//            if(
//                    user.getFirstName().toLowerCase().contains(name.toLowerCase()) ||
//                    user.getLastName().toLowerCase().contains(name.toLowerCase())
//                )
//
//               clients.add(user);
//       }
//
//        // display search result
//        model.addAttribute("users", clients);
//        return "search-client";
//    }

}
