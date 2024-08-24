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
public class UserStoryServiceTest {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserStoryRepository userStoryRepository;

    @Autowired
    private UserStoryService userStoryService;

    @BeforeEach
    public void setUp() {
        // Clear the repository before each test
        userStoryRepository.deleteAll();
    }

    @Test
    public void createUserStoryShouldSaveUserStoryWithSuccess() {
        // Arrange: Create and save a Task object
        Task task = Task.builder()
                .title("Task for User Story")
                .description("Task associated with user stories")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(false)
                .build();

        Task savedTask = taskRepository.save(task);

        // Create a UserStory object
        UserStory userStory = UserStory.builder()
                .title("New User Story")
                .description("Description of the new user story")
                .archived(false)
                .build();

        // Act: Create the user story using the createUserStory method
        UserStory createdUserStory = userStoryService.createUserStory(userStory, savedTask.getId());

        // Fetch the task and user story from the repository to verify
        Task updatedTask = taskRepository.findById(savedTask.getId()).orElse(null);
        UserStory fetchedUserStory = userStoryRepository.findById(createdUserStory.getId()).orElse(null);

        // Assert: Verify the user story was created and linked correctly
        assertNotNull(createdUserStory, "The created user story should not be null");
        assertNotNull(fetchedUserStory, "The fetched user story should not be null");
        assertEquals("New User Story", createdUserStory.getTitle(), "The title of the created user story should match the input title");
        assertEquals("Description of the new user story", createdUserStory.getDescription(), "The description of the created user story should match the input description");
        assertEquals(savedTask.getId(), createdUserStory.getTaskId(), "The task ID in the created user story should match the provided task ID");

        // Verify the user story is added to the task's user stories list
        assertNotNull(updatedTask, "The updated task should not be null");
        assertTrue(updatedTask.getUserStories().stream().anyMatch(us -> us.getId().equals(createdUserStory.getId())),
                "The task's user stories should contain the created user story");

        // Success message
        System.out.println("Test 'createUserStoryShouldSaveUserStoryWithSuccess' passed successfully!");
    }



    @Test
    public void updateUserStoryShouldUpdateUserStoryWithSuccess() {
        // Arrange: Create and save an initial UserStory object
        UserStory initialUserStory = UserStory.builder()
                .title("Initial Title")
                .description("Initial Description")
                .archived(false)
                .build();

        UserStory savedUserStory = userStoryRepository.save(initialUserStory);

        // Create an updated UserStory object
        UserStory updatedUserStory = UserStory.builder()
                .title("Updated Title")
                .description("Updated Description")
                .build();

        // Act: Update the user story using the updateUserStory method
        Optional<UserStory> updatedUserStoryOptional = userStoryService.updateUserStory(savedUserStory.getId(), updatedUserStory);

        // Fetch the updated user story from the repository
        UserStory fetchedUpdatedUserStory = updatedUserStoryOptional.orElse(null);

        // Assert: Verify the user story was updated correctly
        assertNotNull(fetchedUpdatedUserStory, "The updated user story should not be null");
        assertEquals("Updated Title", fetchedUpdatedUserStory.getTitle(), "The title of the updated user story should match the input title");
        assertEquals("Updated Description", fetchedUpdatedUserStory.getDescription(), "The description of the updated user story should match the input description");

        // Success message
        System.out.println("Test 'updateUserStoryShouldUpdateUserStoryWithSuccess' passed successfully!");
    }


    @Test
    public void deleteUserStoryShouldRemoveUserStoryAndUpdateTask() {
        // Arrange: Create and save a Task object
        Task task = Task.builder()
                .title("Task for User Story")
                .description("Task Description")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(false)
                .build();
        taskRepository.save(task);

        // Create and save a UserStory object and associate it with the Task
        UserStory userStory = UserStory.builder()
                .title("User Story to Delete")
                .description("User Story Description")
                .taskId(task.getId())
                .build();
        UserStory savedUserStory = userStoryRepository.save(userStory);

        // Act: Delete the user story using the deleteUserStory method
        userStoryService.deleteUserStory(savedUserStory.getId());

        // Assert: Verify the user story was deleted
        assertFalse(userStoryRepository.findById(savedUserStory.getId()).isPresent(), "The user story should have been deleted");

        // Verify that the user story was removed from the task's user stories
        Optional<Task> updatedTaskOptional = taskRepository.findById(task.getId());
        Task updatedTask = updatedTaskOptional.orElse(null);
        assertNotNull(updatedTask, "The task should exist");
        assertFalse(updatedTask.getUserStories().stream().anyMatch(us -> us.getId().equals(savedUserStory.getId())),
                "The task's user stories should not contain the deleted user story");

        // Success message
        System.out.println("Test 'deleteUserStoryShouldRemoveUserStoryAndUpdateTask' passed successfully!");
    }


    @Test
    public void getUserStoriesByTaskIdShouldReturnOnlyNonArchivedUserStories() {
        // Arrange: Create and save a Task object
        Task task = Task.builder()
                .title("Task for User Stories")
                .description("Task Description")
                .startedAt(LocalDateTime.now())
                .endedAt(LocalDateTime.now().plusDays(1))
                .state(Task.TaskState.IN_PROGRESS)
                .priority(Task.Priority.HIGH)
                .archived(false)
                .build();
        taskRepository.save(task);

        // Create and save UserStory objects, some of which are archived
        UserStory userStory1 = UserStory.builder()
                .title("Active User Story 1")
                .description("Description 1")
                .taskId(task.getId())
                .archived(false)
                .build();
        UserStory userStory2 = UserStory.builder()
                .title("Archived User Story")
                .description("Description 2")
                .taskId(task.getId())
                .archived(true)
                .build();
        UserStory userStory3 = UserStory.builder()
                .title("Active User Story 2")
                .description("Description 3")
                .taskId(task.getId())
                .archived(false)
                .build();

        userStoryRepository.save(userStory1);
        userStoryRepository.save(userStory2);
        userStoryRepository.save(userStory3);

        // Act: Retrieve user stories by task ID
        List<UserStory> nonArchivedUserStories = userStoryService.getUserStoriesByTaskId(task.getId());

        // Assert: Verify that only non-archived user stories are returned
        assertNotNull(nonArchivedUserStories, "The list of user stories should not be null");
        assertEquals(2, nonArchivedUserStories.size(), "There should be 2 non-archived user stories returned");
        assertTrue(nonArchivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory1.getId())), "The returned list should contain User Story 1");
        assertFalse(nonArchivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory2.getId())), "The returned list should not contain the archived User Story");
        assertTrue(nonArchivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory3.getId())), "The returned list should contain User Story 2");

        // Success message
        System.out.println("Test 'getUserStoriesByTaskIdShouldReturnOnlyNonArchivedUserStories' passed successfully!");
    }

    @Test
    public void getAllUserStoriesShouldReturnOnlyNonArchivedUserStories() {
        // Arrange: Create and save multiple UserStory objects
        UserStory userStory1 = UserStory.builder()
                .title("Active User Story 1")
                .description("Description 1")
                .archived(false)
                .build();
        UserStory userStory2 = UserStory.builder()
                .title("Archived User Story")
                .description("Description 2")
                .archived(true)
                .build();
        UserStory userStory3 = UserStory.builder()
                .title("Active User Story 2")
                .description("Description 3")
                .archived(false)
                .build();

        userStoryRepository.save(userStory1);
        userStoryRepository.save(userStory2);
        userStoryRepository.save(userStory3);

        // Act: Retrieve all non-archived user stories
        List<UserStory> nonArchivedUserStories = userStoryService.getAllUserStories();

        // Assert: Verify that only non-archived user stories are returned
        assertNotNull(nonArchivedUserStories, "The list of user stories should not be null");
        assertEquals(2, nonArchivedUserStories.size(), "There should be 2 non-archived user stories returned");
        assertTrue(nonArchivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory1.getId())), "The returned list should contain User Story 1");
        assertFalse(nonArchivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory2.getId())), "The returned list should not contain the archived User Story");
        assertTrue(nonArchivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory3.getId())), "The returned list should contain User Story 2");

        // Success message
        System.out.println("Test 'getAllUserStoriesShouldReturnOnlyNonArchivedUserStories' passed successfully!");
    }


    @Test
    public void archiveUserStoryShouldSetArchivedFlagToTrue() {
        // Arrange: Create and save a UserStory object
        UserStory userStory = UserStory.builder()
                .title("User Story to Archive")
                .description("Description of the user story")
                .archived(false) // Initially not archived
                .build();
        userStory = userStoryRepository.save(userStory);

        // Act: Archive the user story
        userStoryService.archiveUserStory(userStory.getId());

        // Retrieve the user story from the repository to verify it has been archived
        Optional<UserStory> archivedUserStory = userStoryRepository.findById(userStory.getId());

        // Assert: Verify that the user story is archived
        assertTrue(archivedUserStory.isPresent(), "The user story should be present in the repository");
        assertTrue(archivedUserStory.get().isArchived(), "The archived flag of the user story should be true");

        // Success message
        System.out.println("Test 'archiveUserStoryShouldSetArchivedFlagToTrue' passed successfully!");
    }


    @Test
    public void getArchivedUserStoriesShouldReturnOnlyArchivedUserStories() {
        // Arrange: Create and save UserStory objects with mixed archived statuses
        UserStory userStory1 = UserStory.builder()
                .title("Archived User Story 1")
                .description("Description of archived user story 1")
                .archived(true) // Archived
                .build();

        UserStory userStory2 = UserStory.builder()
                .title("Archived User Story 2")
                .description("Description of archived user story 2")
                .archived(true) // Archived
                .build();

        UserStory userStory3 = UserStory.builder()
                .title("Active User Story")
                .description("Description of non-archived user story")
                .archived(false) // Not archived
                .build();

        // Save the user stories to the repository
        userStoryRepository.save(userStory1);
        userStoryRepository.save(userStory2);
        userStoryRepository.save(userStory3);

        // Act: Retrieve all archived user stories
        List<UserStory> archivedUserStories = userStoryService.getArchivedUserStories();

        // Assert: Verify that only archived user stories are returned
        assertNotNull(archivedUserStories, "The list of archived user stories should not be null");
        assertEquals(2, archivedUserStories.size(), "There should be 2 archived user stories returned");
        assertTrue(archivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory1.getId())), "The list should contain Archived User Story 1");
        assertTrue(archivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory2.getId())), "The list should contain Archived User Story 2");
        assertFalse(archivedUserStories.stream().anyMatch(us -> us.getId().equals(userStory3.getId())), "The list should not contain the non-archived User Story");

        // Success message
        System.out.println("Test 'getArchivedUserStoriesShouldReturnOnlyArchivedUserStories' passed successfully!");
    }


    @Test
    public void restoreUserStoryShouldUnarchiveUserStory() {
        // Arrange: Create and save an archived UserStory object
        UserStory archivedUserStory = UserStory.builder()
                .title("Archived User Story")
                .description("Description of archived user story")
                .archived(true) // Initially archived
                .build();

        // Save the archived user story to the repository
        UserStory savedUserStory = userStoryRepository.save(archivedUserStory);

        // Act: Restore the archived user story
        userStoryService.restoreUserStory(savedUserStory.getId());

        // Fetch the user story from the repository to verify its state
        UserStory restoredUserStory = userStoryRepository.findById(savedUserStory.getId())
                .orElseThrow(() -> new AssertionError("UserStory not found after restore"));

        // Assert: Verify that the user story is no longer archived
        assertNotNull(restoredUserStory, "The restored user story should not be null");
        assertFalse(restoredUserStory.isArchived(), "The restored user story should not be archived");

        // Success message
        System.out.println("Test 'restoreUserStoryShouldUnarchiveUserStory' passed successfully!");
    }


}