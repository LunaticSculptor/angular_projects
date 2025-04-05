import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizResponseService } from '../../services/quiz/quiz-response.service';
import { QuizResponse } from '../../models/quiz-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizTimerDirective } from '../../directives/quiz-timer.directive';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [QuizTimerDirective, CommonModule, FormsModule],
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  quiz!: Quiz;
  quizId!: number;
  isLoading: boolean = true;
  showQuiz: boolean = false;
  currentQuestionIndex: number = 0;
  selectedAnswers: { [key: number]: string } = {};
  score: number = 0;
  quizCompleted: boolean = false;
  timeLeft!: number;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private quizResponseService: QuizResponseService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.quizId) {
      this.router.navigate(['/quizzes']);
      return;
    }

    this.quizService.getQuizById(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        this.timeLeft = this.quiz.maxTime; // Set timer based on quiz time
        this.isLoading = false;

        // Start countdown before showing quiz
        setTimeout(() => {
          this.showQuiz = true;
          this.startTimer();
        }, 3000);
      },
      (error) => {
        console.error('Error fetching quiz:', error);
        this.router.navigate(['/quizzes']);
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  // Timer countdown
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finishQuiz(); // Auto-submit when time is up
      }
    }, 1000);
  }

  // Store selected answers
  selectAnswer(questionId: number, answer: string) {
    this.selectedAnswers[questionId] = answer;
  }

  // Move to next question
  nextQuestion() {
    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  // Move to previous question
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  // Finish the quiz
  finishQuiz() {
    clearInterval(this.timerInterval); // Stop timer
    this.calculateScore();
    this.quizCompleted = true;
    this.saveQuizResponse();
  }

  // Calculate score
  calculateScore() {
    let totalScore = 0;
    this.quiz.questions.forEach((question) => {
      if (this.selectedAnswers[question.id] === question.correctAnswer) {
        totalScore += question.marksIfCorrect;
      } else {
        totalScore -= question.negativeMark; // Deduct for wrong answers
      }
    });
    this.score = Math.max(0, totalScore); // Ensure score doesn't go negative
  }

  // reset the answers after quiz is done
  // resetQuiz() {
  //   const confirmReset = confirm("Are you sure you want to reset the quiz progress? This will clear all selected answers and restart the quiz.");
  //   if(confirmReset){
  //     this.selectedAnswers = {}; // Clear selected answers
  //     this.currentQuestionIndex = 0; // Reset to the first question
  //     this.score = 0; // Reset score
  //     this.quizCompleted = false; // Allow quiz to be taken again
  //     this.timeLeft = this.quiz.maxTime; // Reset timer
    
  //     // Restart timer
  //     clearInterval(this.timerInterval);
  //     this.startTimer();
  //   }
  // }
  
  // reset selected answers
  resetQuizProgress() {
    const confirmReset = confirm("Are you sure you want to reset the quiz progress? This will clear all selected answers.");
    
    if (confirmReset) {
      this.selectedAnswers = {}; // Clear selected answers
      this.currentQuestionIndex = 0; // Reset to the first question
    }
  }
  
  // Reset Current Question
  resetCurrentQuestion() {
    const currentQuestionId = this.quiz.questions[this.currentQuestionIndex].id;
    this.selectedAnswers[currentQuestionId] = ''; // Clear the selected answer for the current question
  }  

  // Save quiz response
  saveQuizResponse() {
    const quizResponse: QuizResponse = {
      userId: this.auth.getUser()!.id,
      quizId: this.quizId,
      submittedAt: new Date().toISOString(),
      score: this.score,
      answers: this.quiz.questions.map((question) => ({
        questionId: question.id,
        selectedAnswer: this.selectedAnswers[question.id] || '',
        isCorrect: this.selectedAnswers[question.id] === question.correctAnswer,
      })),
    };

    this.quizResponseService.submitQuizResponse(quizResponse).subscribe(
      (response) => {
        console.log('Quiz response saved:', response);
      },
      (error) => {
        console.error('Error saving quiz response:', error);
      }
    );
  }

  // Navigate back to quizzes
  goBackToQuizzes() {
    this.router.navigate(['/quizzes']);
  }
}
