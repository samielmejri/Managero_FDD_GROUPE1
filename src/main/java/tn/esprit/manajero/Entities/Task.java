package tn.esprit.manajero.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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








    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return archived == task.archived &&
                Objects.equals(id, task.id) &&
                Objects.equals(title, task.title) &&
                Objects.equals(description, task.description) &&
                Objects.equals(startedAt, task.startedAt) &&
                Objects.equals(endedAt, task.endedAt) &&
                state == task.state &&
                priority == task.priority &&
                Objects.equals(collaborators, task.collaborators) &&
                Objects.equals(userStories, task.userStories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, startedAt, endedAt, state, priority, collaborators, userStories, archived);
    }
}



