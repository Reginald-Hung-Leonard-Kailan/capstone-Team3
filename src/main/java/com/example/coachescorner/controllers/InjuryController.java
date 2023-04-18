package com.example.coachescorner.controllers;

import com.example.coachescorner.model.Injury;
import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.InjuryRepository;
import com.example.coachescorner.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class InjuryController {

    private InjuryRepository injuryDao;
    private UserRepository userDao;

    public InjuryController(InjuryRepository injuryDao, UserRepository userDao) {
        this.injuryDao = injuryDao;
        this.userDao = userDao;
    }

    @GetMapping("/clients/injury/{id}/edit")
    public String showEditInjuryForm(@PathVariable long id, Model model) {
        Injury injury = injuryDao.findById(id);
        System.out.println(injury);
        model.addAttribute("injury", injury);
        return "home";
    }




    @GetMapping("/add-injury/{id}")
    public String showInjuryForm(Model model, @PathVariable long id){
        model.addAttribute("injury", new Injury());
       User user = userDao.findById(id);
       model.addAttribute("user", user);
        return "add-injury";
    }


    @PostMapping("/add-injury/{id}")
    public String addInjuryButton(@ModelAttribute Injury injury, @PathVariable long id, @RequestParam Injury.Status status){
        User client = userDao.findById(id);
        injury.setStatus(status);
        injury.setUserId(client);
        Injury newInjury = new Injury(injury);
        injuryDao.save(newInjury);

        return "redirect:/home";
    }
}
