export interface QuizResponse {
    id?: number; // Optional, JSON Server auto-generates ID
    userId: number;
    quizId: number;
    submittedAt: string; // ISO string format
    score: number;
    answers: {
      questionId: number;
      selectedAnswer: string;
      isCorrect: boolean;
    }[];
  }
  