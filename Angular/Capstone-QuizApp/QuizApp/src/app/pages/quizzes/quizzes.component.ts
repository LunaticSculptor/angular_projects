import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizResponseService } from '../../services/quiz/quiz-response.service';
import { Quiz } from '../../models/quiz';
import { QuizResponse } from '../../models/quiz-response';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { AnswerCorrectnessPipe } from '../../pipes/answer-correctness.pipe';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, AnswerCorrectnessPipe],
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];
  takenQuizzes: { [category: string]: (Quiz & { score: number })[] } = {};
  availableQuizzes: { [category: string]: Quiz[] } = {};
  userId = 1;
  selectedQuizResult: (QuizResponse & { category: string; maxScore: number }) | null = null;

  constructor(
    private quizService: QuizService,
    private quizResponseService: QuizResponseService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
    this.userId = this.auth.getUser()!.id;
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      this.quizResponseService.getResponsesByUserId(this.userId).subscribe(responses => {
        const takenQuizIds = responses.map(r => String(r.quizId));

        this.takenQuizzes = this.groupByCategory(
          quizzes.filter(q => takenQuizIds.includes(String(q.id))).map(q => {
            const response = responses.find(r => String(r.quizId) === String(q.id));
            return { ...q, score: response?.score ?? 0 };
          })
        );

        this.availableQuizzes = this.groupByCategory(
          quizzes.filter(q => !takenQuizIds.includes(String(q.id)))
        );
      });
    });
  }

  groupByCategory<T extends Quiz>(quizzes: T[]): { [category: string]: T[] } {
    return quizzes.reduce((acc, quiz) => {
      acc[quiz.category] = acc[quiz.category] || [];
      acc[quiz.category].push(quiz);
      return acc;
    }, {} as { [category: string]: T[] });
  }

  takeQuiz(quizId: number) {
    const alreadyTaken = Object.values(this.takenQuizzes).some(category =>
      category.some(quiz => quiz.id === quizId)
    );  
    if (alreadyTaken) {
      alert("You have already taken this quiz and cannot retake it.");
      return;
    }
    this.router.navigate(['/take-quiz', quizId]);
  }

  viewResult(quizId: number) {
    this.quizResponseService.getResponseByQuiz(quizId, this.userId).subscribe(response => {
      if (response) {
        this.quizService.getQuizById(quizId).subscribe(quiz => {
          this.selectedQuizResult = {
            ...response,
            category: quiz.category,
            maxScore: quiz.maxScore
          };
        });
      } else {
        console.log('No quiz response found for this quiz.');
        this.selectedQuizResult = null;
      }
    });
  }  

  closeResult() {
    this.selectedQuizResult = null;
  }

  get takenQuizCategories() {
    return Object.keys(this.takenQuizzes);
  }

  get availableQuizCategories() {
    return Object.keys(this.availableQuizzes);
  }
}
