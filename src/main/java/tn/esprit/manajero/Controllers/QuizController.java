package tn.esprit.manajero.Controllers;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.manajero.Entities.*;
import tn.esprit.manajero.Services.QuizService;

import java.util.List;

@RestController
@RequestMapping("quiz")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular app

public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/quiz/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category, @RequestParam Integer numQ, @RequestParam String title) {
        // Assuming quizService.createQuiz returns a success message
        String successMessage = quizService.createQuiz(category, numQ, title).getBody();
        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\":\"" + successMessage + "\"}");
    }


    @GetMapping("getById/{_id}")
    public List<QuestionWrapper> getQuizQuestions(@PathVariable String _id) {
        return quizService.getQuizQuestions(_id).getBody();
    }
//
//    @GetMapping("getByCategory/{category}")
//    public List<QuizWrapper> getQuizzesByCategory(@PathVariable String category) {
//        return quizService.getQuizzesByCategory(category).getBody();
//    }$

    @GetMapping("getAll")
    public List<QuizWrapper> getAllQuizzes() {
        return quizService.getAllQuizzes().getBody();
    }

    @PostMapping("submit/{_id}")
    public Integer getQuizResult(@PathVariable String _id, @RequestBody List<Response> responses) {
        return quizService.calculateResult(_id, responses).getBody();}


    @PutMapping("/update/{_id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable String _id, @RequestBody Quiz updatedQuiz) {
        Quiz quiz = quizService.updateQuiz(_id, updatedQuiz);
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }
    @PostMapping("/{_id}/submit")
    public Integer  submitQuiz(@PathVariable String _id, @RequestParam String userId, @RequestBody List<Response> responses) {
        return   quizService.submitQuiz(userId, _id, responses).getBody();



    }

    @GetMapping("/quizzez/{_id}")
    public Quiz getQuiz(@PathVariable String _id) {
        return quizService.getQuizById(_id);
    }



    @GetMapping("/{quizId}/statistics")
    public ResponseEntity<QuizStatistics> getQuizStatistics(@PathVariable String quizId) {
        QuizStatistics statistics = quizService.calculateQuizStatistics(quizId);

        if (statistics == null) {
            return ResponseEntity.notFound().build(); // Handle no statistics found
        }

        return ResponseEntity.ok(statistics);
    }




    @DeleteMapping("/delete/{_id}")
    public ResponseEntity<String> deleteQuiz(@PathVariable String _id) {
        return quizService.deleteQuiz(_id);
    }

}





