package tn.esprit.manajero.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.manajero.Entities.Task;
import tn.esprit.manajero.Repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
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
        taskRepository.deleteById(id);
    }
}
