package tn.esprit.manajero.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.manajero.Entities.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
}