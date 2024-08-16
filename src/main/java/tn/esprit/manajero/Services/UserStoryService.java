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
        userStory.setTaskId(taskId);
        UserStory createdUserStory = userStoryRepository.save(userStory);

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
        return userStoryRepository.findByTaskId(taskId).stream()
                .filter(userStory -> !userStory.isArchived())
                .collect(Collectors.toList());
    }


    public List<UserStory> getAllUserStories() {
        return userStoryRepository.findAll().stream()
                .filter(userStory -> !userStory.isArchived())
                .collect(Collectors.toList());
    }

    public void archiveUserStory(String id) {
        Optional<UserStory> userStoryOptional = userStoryRepository.findById(id);
        userStoryOptional.ifPresent(userStory -> {
            userStory.setArchived(true);
            userStoryRepository.save(userStory);
        });
    }

    public List<UserStory> getArchivedUserStories() {
        return userStoryRepository.findByArchivedTrue();
    }

    public void restoreUserStory(String id) {
        Optional<UserStory> userStoryOptional = userStoryRepository.findById(id);
        userStoryOptional.ifPresent(userStory -> {
            userStory.setArchived(false);
            userStoryRepository.save(userStory);
        });
    }
}
