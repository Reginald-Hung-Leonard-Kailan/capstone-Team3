package com.example.coachescorner.controllers;

import com.example.coachescorner.model.Injury;
import com.example.coachescorner.model.User;
import com.example.coachescorner.repositories.InjuryRepository;
import com.example.coachescorner.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class InjuryController {

    private InjuryRepository injuryDao;
    private UserRepository userDao;

    public InjuryController(InjuryRepository injuryDao, UserRepository userDao) {
        this.injuryDao = injuryDao;
        this.userDao = userDao;
    }

    @GetMapping("/injury/edit/{id}")
    public String showEditInjuryForm(@PathVariable long id, Model model) {
        Injury injury = injuryDao.findById(id);
        model.addAttribute("injury", injury);
        return "injury-edit";
    }

    @PostMapping("/injury/edit/{id}")
    public String saveEditInjuryForm(@PathVariable long id, @RequestParam Injury.Status status,
                                     @RequestParam String description,
                                     @RequestParam String injuryDate,
                                     @RequestParam String title,
                                     Model model) throws ParseException {
        //parse string date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(injuryDate);

        // getting user id from injury table
        Injury userInjury = injuryDao.findById(id);
        User user = userInjury.getUser();

        // create the injury object and save it to the database
        Injury injury = new Injury();
        injury.setId(id);
        injury.setStatus(status);
        injury.setDescription(description);
        injury.setInjuryDate(date);
        injury.setTitle(title);
        injury.setUser(user);
        injuryDao.save(injury);
        return "redirect:/home";
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
        injury.setUser(client);
        Injury newInjury = new Injury(injury);
        injuryDao.save(newInjury);

        return "redirect:/home";
    }
}
