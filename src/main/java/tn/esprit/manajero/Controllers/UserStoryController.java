package tn.esprit.manajero.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.manajero.Entities.UserStory;
import tn.esprit.manajero.Services.UserStoryService;

import java.util.List;

@RestController
@RequestMapping("/user-stories")
@CrossOrigin(origins = "http://localhost:4200")
public class UserStoryController {

    @Autowired
    private UserStoryService userStoryService;

    @PostMapping
    public UserStory createUserStory(@RequestBody UserStory userStory, @RequestParam String taskId) {
        return userStoryService.createUserStory(userStory, taskId);
    }

    @GetMapping
    public List<UserStory> getAllUserStories() {
        return userStoryService.getAllUserStories();
    }

    @GetMapping("/{taskId}")
    public List<UserStory> getUserStoriesByTaskId(@PathVariable String taskId) {
        return userStoryService.getUserStoriesByTaskId(taskId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserStory> updateUserStory(@PathVariable String id, @RequestBody UserStory userStory) {
        return userStoryService.updateUserStory(id, userStory)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteUserStory(@PathVariable String id) {
        userStoryService.deleteUserStory(id);
    }

    @PostMapping("/{id}/archive")
    public void archiveUserStory(@PathVariable String id) {
        userStoryService.archiveUserStory(id);
    }

    @GetMapping("/archived")
    public List<UserStory> getArchivedUserStories() {
        return userStoryService.getArchivedUserStories();
    }

    @PostMapping("/{id}/restore")
    public void restoreUserStory(@PathVariable String id) {
        userStoryService.restoreUserStory(id);
    }
}
