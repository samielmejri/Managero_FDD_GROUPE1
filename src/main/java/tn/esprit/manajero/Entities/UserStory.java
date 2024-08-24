package tn.esprit.manajero.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "userStory")
public class UserStory {
    @Id
    private String id;
    private String title;
    private String description;
    private String taskId;
    private boolean archived;

}