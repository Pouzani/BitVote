package com.bitvote.project.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("username") String username){
        UserResponse user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }


    @PutMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@RequestBody User user){
        UserResponse updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> searchUser(@RequestParam(value = "query") String query){
        List<UserResponse> users = userService.searchUsers(query);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID: "+id+" was deleted");
    }

}
