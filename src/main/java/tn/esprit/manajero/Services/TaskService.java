package tn.esprit.manajero.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.manajero.Entities.Task;
import tn.esprit.manajero.Entities.UserStory;
import tn.esprit.manajero.Repositories.TaskRepository;
import tn.esprit.manajero.Repositories.UserStoryRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserStoryRepository userStoryRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll().stream()
                .filter(task -> !task.isArchived())
                .collect(Collectors.toList());
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setDescription(taskDetails.getDescription());
                    task.setStartedAt(taskDetails.getStartedAt());
                    task.setEndedAt(taskDetails.getEndedAt());
                    task.setState(taskDetails.getState());
                    task.setPriority(taskDetails.getPriority());
                    task.setCollaborators(taskDetails.getCollaborators());
                    task.setUserStories(taskDetails.getUserStories());
                    return taskRepository.save(task);
                })
                .orElseGet(() -> {
                    taskDetails.setId(id);
                    return taskRepository.save(taskDetails);
                });
    }

    public void deleteTask(String id) {
        List<UserStory> relatedUserStories = userStoryRepository.findByTaskId(id);
        for (UserStory userStory : relatedUserStories) {
            userStoryRepository.delete(userStory);
        }
        taskRepository.deleteById(id);
    }

    public void archiveTask(String id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        taskOptional.ifPresent(task -> {
            task.setArchived(true);
            taskRepository.save(task);
        });
    }

    public List<Task> getArchivedTasks() {
        return taskRepository.findByArchivedTrue();
    }

    public void restoreTask(String id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        taskOptional.ifPresent(task -> {
            task.setArchived(false);
            taskRepository.save(task);
        });
    }
}
