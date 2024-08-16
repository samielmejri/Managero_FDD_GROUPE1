package tn.esprit.manajero.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.manajero.Entities.Task;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByArchivedTrue();


}