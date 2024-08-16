package tn.esprit.manajero.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.manajero.Entities.UserStory;

import java.util.List;

public interface UserStoryRepository extends MongoRepository<UserStory, String> {
    List<UserStory> findByTaskId(String taskId);
    List<UserStory> findByArchivedTrue();
}
