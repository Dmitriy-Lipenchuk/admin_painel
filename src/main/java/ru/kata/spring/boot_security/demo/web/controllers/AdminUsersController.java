package ru.kata.spring.boot_security.demo.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.web.models.User;
import ru.kata.spring.boot_security.demo.web.service.UserService;

import java.security.Principal;

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
