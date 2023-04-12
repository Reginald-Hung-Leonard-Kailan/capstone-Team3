package com.example.coachescorner.controllers;

import com.example.coachescorner.model.Injury;
import com.example.coachescorner.repositories.InjuryRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class InjuryController {

    private InjuryRepository injuryDao;

    public InjuryController(InjuryRepository injuryDao) {
        this.injuryDao = injuryDao;
    }

    @GetMapping("/clients/injury/{id}/edit")
    public String showEditInjuryForm(@PathVariable long id, Model model){
        Injury injury = injuryDao.findById(id);
        System.out.println(injury);
        model.addAttribute("injury", injury);
        return "home";
    }
}
