package com.example.coachescorner.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Validator;

@Service
public class ValidatorService {

    @Autowired
    private Validator validator;
}
