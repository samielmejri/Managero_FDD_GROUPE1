package tn.esprit.manajero.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.manajero.Entities.Collaborator;

public interface CollaboratorRepository extends MongoRepository<Collaborator, String> {
}
