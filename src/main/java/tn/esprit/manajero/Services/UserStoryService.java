package tn.esprit.manajero.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.manajero.Entities.Task;
import tn.esprit.manajero.Entities.UserStory;
import tn.esprit.manajero.Repositories.TaskRepository;
import tn.esprit.manajero.Repositories.UserStoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserStoryService {

    @Autowired
    private UserStoryRepository userStoryRepository;

    @Autowired
    private TaskRepository taskRepository;

    public UserStory createUserStory(UserStory userStory, String taskId) {
        // Set the taskId for the user story
        userStory.setTaskId(taskId);
        UserStory createdUserStory = userStoryRepository.save(userStory);

        // Update the task to include the new user story
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            if (task.getUserStories() == null) {
                task.setUserStories(new ArrayList<>());
            }
            task.getUserStories().add(createdUserStory);
            taskRepository.save(task);
        }

        return createdUserStory;
    }

    public Optional<UserStory> updateUserStory(String id, UserStory updatedUserStory) {
        Optional<UserStory> userStory = userStoryRepository.findById(id);
        if (userStory.isPresent()) {
            UserStory existingUserStory = userStory.get();
            existingUserStory.setTitle(updatedUserStory.getTitle());
            existingUserStory.setDescription(updatedUserStory.getDescription());
            return Optional.of(userStoryRepository.save(existingUserStory));
        }
        return Optional.empty();
    }

    public void deleteUserStory(String id) {
        Optional<UserStory> userStoryOptional = userStoryRepository.findById(id);
        if (userStoryOptional.isPresent()) {
            UserStory userStory = userStoryOptional.get();
            String taskId = userStory.getTaskId();
            userStoryRepository.deleteById(id);

            // Remove the user story from the associated task
            Optional<Task> taskOptional = taskRepository.findById(taskId);
            if (taskOptional.isPresent()) {
                Task task = taskOptional.get();
                if (task.getUserStories() != null) {
                    task.setUserStories(task.getUserStories().stream()
                            .filter(us -> !us.getId().equals(id))
                            .collect(Collectors.toList()));
                    taskRepository.save(task);
                }
            }
        }
    }

    public List<UserStory> getUserStoriesByTaskId(String taskId) {
        return userStoryRepository.findByTaskId(taskId);
    }


    public List<UserStory> getAllUserStories() {
        return userStoryRepository.findAll();
    }
}