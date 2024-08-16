package tn.esprit.manajero.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    private String title;
    private String description;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private TaskState state;
    private Priority priority;
    private List<Collaborator> collaborators;

    private List<UserStory> userStories = new ArrayList<>();
    private boolean archived;


    public enum TaskState {
        IN_PROGRESS, DONE, PAUSED, PLANNING, CANCELED
    }

    public enum Priority {
        HIGH, MEDIUM, LOW
    }

}


