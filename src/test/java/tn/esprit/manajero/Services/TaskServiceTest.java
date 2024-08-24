package tn.esprit.manajero.Services;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tn.esprit.manajero.Entities.Task;
import tn.esprit.manajero.Entities.UserStory;
import tn.esprit.manajero.ManajeroApplication;
import tn.esprit.manajero.Repositories.TaskRepository;
import tn.esprit.manajero.Repositories.UserStoryRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = ManajeroApplication.class)
@Slf4j
public class TaskServiceTest {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserStoryRepository userStoryRepository;

    @BeforeEach
    public void setUp() {
        // Clear the repository before each test
        taskRepository.deleteAll();
    }

    @Test
    public void createTaskShouldSaveTaskWithSuccess() {
        // Arrange: Create a Task object
        Task task = Task.builder()
                .title("Test Task")
                .description("This is a test task")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(false)
                .build();

        // Act: Save the task using the createTask method
        Task savedTask = taskService.createTask(task);

        // Assert: Verify the task was saved correctly
        assertNotNull(savedTask.getId(), "The saved task should have an ID");
        assertEquals("Test Task", savedTask.getTitle(), "The title of the saved task should match the input title");
        assertEquals("This is a test task", savedTask.getDescription(), "The description of the saved task should match the input description");
        assertEquals(Task.TaskState.IN_PROGRESS, savedTask.getState(), "The state of the saved task should match the input state");
        assertEquals(Task.Priority.HIGH, savedTask.getPriority(), "The priority of the saved task should match the input priority");
        assertFalse(savedTask.isArchived(), "The task should not be archived");

        // Success message
        System.out.println("Test 'createTaskShouldSaveTaskWithSuccess' passed successfully!");
    }


    @Test
    public void getAllTasksShouldReturnOnlyNonArchivedTasks() {
        // Arrange: Create multiple Task objects
        Task task1 = Task.builder()
                .title("Task 1")
                .description("First task")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(false)
                .build();

        Task task2 = Task.builder()
                .title("Task 2")
                .description("Second task")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.DONE)
                .priority(Task.Priority.MEDIUM)
                .archived(true)
                .build();

        Task task3 = Task.builder()
                .title("Task 3")
                .description("Third task")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.PAUSED)
                .priority(Task.Priority.LOW)
                .archived(false)
                .build();

        // Save tasks to the repository
        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);

        // Fetch directly from the repository to verify they are saved
        List<Task> allTasks = taskRepository.findAll();
        assertEquals(3, allTasks.size(), "There should be 3 tasks in the repository");

        // Act: Retrieve all non-archived tasks using the getAllTasks method
        List<Task> nonArchivedTasks = taskService.getAllTasks();

        // Debug: Print out the non-archived tasks to understand what's returned
        System.out.println("Non-Archived Tasks:");
        nonArchivedTasks.forEach(task -> System.out.println(task.getTitle() + " (ID: " + task.getId() + ") Archived: " + task.isArchived()));

        // Assert: Verify that only non-archived tasks are returned
        assertNotNull(nonArchivedTasks, "The returned task list should not be null");
        assertEquals(2, nonArchivedTasks.size(), "There should be 2 non-archived tasks returned");

        // Directly verify by comparing IDs to bypass equals method issues
        assertTrue(nonArchivedTasks.stream().anyMatch(task -> task.getId().equals(task1.getId())), "The returned list should contain Task 1");
        assertFalse(nonArchivedTasks.stream().anyMatch(task -> task.getId().equals(task2.getId())), "The returned list should not contain the archived Task 2");
        assertTrue(nonArchivedTasks.stream().anyMatch(task -> task.getId().equals(task3.getId())), "The returned list should contain Task 3");

        // Success message
        System.out.println("Test 'getAllTasksShouldReturnOnlyNonArchivedTasks' passed successfully!");
    }

    @Test
    public void getTaskByIdShouldReturnCorrectTask() {
        // Arrange: Create a Task object and save it to the repository
        Task task = Task.builder()
                .title("Test Task by ID")
                .description("Task to test getTaskById method")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.MEDIUM)
                .archived(false)
                .build();

        // Save the task to the repository
        Task savedTask = taskRepository.save(task);

        // Act: Retrieve the task by ID using the getTaskById method
        Optional<Task> retrievedTaskOptional = taskService.getTaskById(savedTask.getId());

        // Assert: Verify that the returned task is the correct one
        assertTrue(retrievedTaskOptional.isPresent(), "The task should be found in the repository");
        Task retrievedTask = retrievedTaskOptional.get();
        assertEquals(savedTask.getId(), retrievedTask.getId(), "The retrieved task ID should match the saved task ID");
        assertEquals(savedTask.getTitle(), retrievedTask.getTitle(), "The retrieved task title should match the saved task title");
        assertEquals(savedTask.getDescription(), retrievedTask.getDescription(), "The retrieved task description should match the saved task description");

        // Success message
        System.out.println("Test 'getTaskByIdShouldReturnCorrectTask' passed successfully!");
    }

    @Test
    public void updateTaskShouldUpdateTaskWithSuccess() {
        // Arrange: Create and save an initial Task object
        Task initialTask = Task.builder()
                .title("Initial Task")
                .description("This is the initial task description")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(2))
                .state(Task.TaskState.PLANNING)
                .priority(Task.Priority.LOW)
                .archived(false)
                .build();

        Task savedTask = taskRepository.save(initialTask);

        // New details to update the task
        Task updatedTaskDetails = Task.builder()
                .title("Updated Task Title")
                .description("This is the updated task description")
                .startedAt(LocalDateTime.now().minusDays(1))
                .endedAt(LocalDateTime.now().plusDays(3))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(false)
                .build();

        // Act: Update the task using the updateTask method
        Task updatedTask = taskService.updateTask(savedTask.getId(), updatedTaskDetails);

        // Assert: Verify that the task was updated correctly
        assertNotNull(updatedTask.getId(), "The updated task should have an ID");
        assertEquals(savedTask.getId(), updatedTask.getId(), "The ID of the updated task should match the saved task ID");
        assertEquals("Updated Task Title", updatedTask.getTitle(), "The title of the updated task should match the new title");
        assertEquals("This is the updated task description", updatedTask.getDescription(), "The description of the updated task should match the new description");
        assertEquals(Task.TaskState.IN_PROGRESS, updatedTask.getState(), "The state of the updated task should match the new state");
        assertEquals(Task.Priority.HIGH, updatedTask.getPriority(), "The priority of the updated task should match the new priority");
        assertFalse(updatedTask.isArchived(), "The updated task should not be archived");

        // Success message
        System.out.println("Test 'updateTaskShouldUpdateTaskWithSuccess' passed successfully!");
    }


    @Test
    public void deleteTaskShouldRemoveTaskAndRelatedUserStories() {
        // Arrange: Create and save a Task object
        Task task = Task.builder()
                .title("Task to Delete")
                .description("Task to be deleted")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.MEDIUM)
                .archived(false)
                .build();

        // Save the task to the repository
        Task savedTask = taskRepository.save(task);

        // Create and save related UserStory objects
        UserStory userStory1 = new UserStory(); // Initialize userStory1
        userStory1.setTaskId(savedTask.getId());
        UserStory userStory2 = new UserStory(); // Initialize userStory2
        userStory2.setTaskId(savedTask.getId());

        userStoryRepository.save(userStory1);
        userStoryRepository.save(userStory2);

        // Act: Delete the task using the deleteTask method
        taskService.deleteTask(savedTask.getId());

        // Assert: Verify that the task is deleted
        assertFalse(taskRepository.findById(savedTask.getId()).isPresent(), "The task should be deleted from the repository");

        // Assert: Verify that related user stories are also deleted
        List<UserStory> relatedUserStories = userStoryRepository.findByTaskId(savedTask.getId());
        assertTrue(relatedUserStories.isEmpty(), "All related user stories should be deleted");

        // Success message
        System.out.println("Test 'deleteTaskShouldRemoveTaskAndRelatedUserStories' passed successfully!");
    }


    @Test
    public void archiveTaskShouldArchiveTaskSuccessfully() {
        // Arrange: Create and save a Task object
        Task task = Task.builder()
                .title("Task to Archive")
                .description("Task that will be archived")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.MEDIUM)
                .archived(false)
                .build();

        // Save the task to the repository
        Task savedTask = taskRepository.save(task);

        // Act: Archive the task using the archiveTask method
        taskService.archiveTask(savedTask.getId());

        // Fetch the task from the repository to verify it is archived
        Task archivedTask = taskRepository.findById(savedTask.getId()).orElse(null);

        // Assert: Verify that the task is archived
        assertNotNull(archivedTask, "The task should exist in the repository");
        assertTrue(archivedTask.isArchived(), "The task should be archived");

        // Success message
        System.out.println("Test 'archiveTaskShouldArchiveTaskSuccessfully' passed successfully!");
    }


    @Test
    public void getArchivedTasksShouldReturnOnlyArchivedTasks() {
        // Arrange: Create and save tasks with different archived statuses
        Task task1 = Task.builder()
                .title("Archived Task 1")
                .description("First archived task")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(true)
                .build();

        Task task2 = Task.builder()
                .title("Archived Task 2")
                .description("Second archived task")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.DONE)
                .priority(Task.Priority.MEDIUM)
                .archived(true)
                .build();

        Task task3 = Task.builder()
                .title("Non-Archived Task")
                .description("Task that is not archived")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.PAUSED)
                .priority(Task.Priority.LOW)
                .archived(false)
                .build();

        // Save the tasks to the repository
        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);

        // Act: Retrieve all archived tasks using the getArchivedTasks method
        List<Task> archivedTasks = taskService.getArchivedTasks();

        // Assert: Verify that only archived tasks are returned
        assertNotNull(archivedTasks, "The returned list should not be null");
        assertEquals(2, archivedTasks.size(), "There should be 2 archived tasks returned");

        // Check that the list contains only archived tasks
        assertTrue(archivedTasks.stream().anyMatch(task -> task.getId().equals(task1.getId())), "The returned list should contain Archived Task 1");
        assertTrue(archivedTasks.stream().anyMatch(task -> task.getId().equals(task2.getId())), "The returned list should contain Archived Task 2");
        assertFalse(archivedTasks.stream().anyMatch(task -> task.getId().equals(task3.getId())), "The returned list should not contain Non-Archived Task");

        // Success message
        System.out.println("Test 'getArchivedTasksShouldReturnOnlyArchivedTasks' passed successfully!");
    }


    @Test
    public void restoreTaskShouldRestoreArchivedTaskSuccessfully() {
        // Arrange: Create and save an archived Task object
        Task archivedTask = Task.builder()
                .title("Archived Task to Restore")
                .description("Task that will be restored")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.MEDIUM)
                .archived(true) // Initially archived
                .build();

        // Save the task to the repository
        Task savedArchivedTask = taskRepository.save(archivedTask);

        // Act: Restore the task using the restoreTask method
        taskService.restoreTask(savedArchivedTask.getId());

        // Fetch the task from the repository to verify it is restored
        Task restoredTask = taskRepository.findById(savedArchivedTask.getId()).orElse(null);

        // Assert: Verify that the task is restored (not archived)
        assertNotNull(restoredTask, "The task should exist in the repository");
        assertFalse(restoredTask.isArchived(), "The task should be restored (archived status should be false)");

        // Success message
        System.out.println("Test 'restoreTaskShouldRestoreArchivedTaskSuccessfully' passed successfully!");
    }

}

