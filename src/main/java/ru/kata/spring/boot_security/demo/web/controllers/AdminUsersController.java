package ru.kata.spring.boot_security.demo.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.web.models.Role;
import ru.kata.spring.boot_security.demo.web.models.User;
import ru.kata.spring.boot_security.demo.web.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Collections;

@Controller
@RequestMapping("/admin")
public class AdminUsersController {

    private final UserService userService;

    @Autowired
    public AdminUsersController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public String getUsers(Model model, Principal principal) {
        User admin = userService.findByUsername(principal.getName());

        model.addAttribute("admin", admin);

        return "/users";
    }

}
