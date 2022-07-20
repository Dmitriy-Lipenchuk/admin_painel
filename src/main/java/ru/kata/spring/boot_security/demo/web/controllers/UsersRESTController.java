package ru.kata.spring.boot_security.demo.web.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.web.models.User;
import ru.kata.spring.boot_security.demo.web.service.UserService;

import java.util.Collections;
import java.util.List;

@RestController
public class UsersRESTController {

    private final UserService userService;

    @Autowired
    public UsersRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getSingleUser(@PathVariable("id") long id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @PutMapping("/admin")
    public void updateUser(@RequestBody User user) {

        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));

        if (user.getRoles().size() >= 1) {
            user.getRoles().get(0).setRoleId();
            user.setRoles(Collections.singletonList(user.getRoles().get(0)));
        } else {
            user.setRoles(Collections.emptyList());
        }

        userService.updateUser(user);
    }

    @PostMapping("/admin")
    public void addUser(@RequestBody User user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));

        if (user.getRoles().size() >= 1) {
            user.getRoles().get(0).setRoleId();
            user.setRoles(Collections.singletonList(user.getRoles().get(0)));
        } else {
            user.setRoles(Collections.emptyList());
        }

        userService.addUser(user);
    }

    @DeleteMapping("/admin")
    public void deleteUser(@RequestBody User user) {
        userService.removeUser(user.getId());
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        User currentUser = userService.findByUsername(username);

        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
}
