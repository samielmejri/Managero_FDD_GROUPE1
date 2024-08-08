export interface QuizSchedule {
    id: string; // Assuming the ID is a number
    quizId: string;
    scheduledAt: Date;
    status: string;
 
    // Add other properties as needed
  }