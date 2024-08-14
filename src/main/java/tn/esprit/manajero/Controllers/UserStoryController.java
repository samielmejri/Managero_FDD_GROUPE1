package tn.esprit.manajero.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.manajero.Entities.UserStory;
import tn.esprit.manajero.Repositories.UserStoryRepository;
import tn.esprit.manajero.Services.UserStoryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/userstories")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular app

public class UserStoryController {

    @Autowired
    private UserStoryService userStoryService;
    private UserStoryRepository userStoryRepository;

    @PostMapping("/task/{taskId}")
    public ResponseEntity<UserStory> createUserStory(@RequestBody UserStory userStory, @PathVariable String taskId) {
        UserStory createdUserStory = userStoryService.createUserStory(userStory, taskId);
        return ResponseEntity.ok(createdUserStory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserStory> updateUserStory(@PathVariable String id, @RequestBody UserStory userStory) {
        Optional<UserStory> updatedUserStory = userStoryService.updateUserStory(id, userStory);
        return updatedUserStory.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserStory(@PathVariable String id) {
        userStoryService.deleteUserStory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<UserStory>> getUserStoriesByTaskId(@PathVariable String taskId) {
        List<UserStory> userStories = userStoryService.getUserStoriesByTaskId(taskId);
        return ResponseEntity.ok(userStories);
    }

    @GetMapping("/getAll")
    public List<UserStory> getAllUserStories() {
        return userStoryService.getAllUserStories();
    }

}
