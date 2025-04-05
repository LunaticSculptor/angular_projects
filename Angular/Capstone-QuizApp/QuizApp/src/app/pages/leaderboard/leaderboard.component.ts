import { Component, OnInit } from '@angular/core';
import { QuizResponseService } from '../../services/quiz/quiz-response.service';
import { AuthService } from '../../services/auth/auth.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizResponse } from '../../models/quiz-response';
import { Quiz } from '../../models/quiz';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LeaderboardEntry {
  userId: number;
  username: string;
  quizCategory?: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  quizResponses: QuizResponse[] = [];
  quizzes: Quiz[] = [];
  leaderboard: LeaderboardEntry[] = [];
  categories: string[] = []; // Dropdown options
  selectedCategory: string | 'global' = 'global'; // Default to global leaderboard

  constructor(
    private quizResponseService: QuizResponseService,
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.quizResponseService.getAllResponses().subscribe(responses => {
      this.quizResponses = responses;
      this.quizService.getQuizzes().subscribe(quizzes => {
        this.quizzes = quizzes;
        this.categories = [...new Set(this.quizzes.map(q => q.category))]; // Get unique categories
        this.updateLeaderboard();
      });
    });
  }

  updateLeaderboard(): void {
    if (this.selectedCategory === 'global') {
      this.generateGlobalLeaderboard();
    } else {
      this.generateCategoryLeaderboard(this.selectedCategory);
    }
  }

  generateGlobalLeaderboard(): void {
    const userScores: { [userId: number]: number } = {};

    this.quizResponses.forEach(response => {
      userScores[response.userId] = (userScores[response.userId] || 0) + response.score;
    });

    const usernameRequests: Observable<LeaderboardEntry>[] = Object.keys(userScores).map(userId => {
      return this.authService.getUsernameById(+userId).pipe(
        map(username => ({
          userId: +userId,
          username,
          score: userScores[+userId]
        }))
      );
    });

    forkJoin(usernameRequests).subscribe(entries => {
      this.leaderboard = entries.sort((a, b) => b.score - a.score);
    });
  }

  generateCategoryLeaderboard(category: string): void {
    // console.log("Selected category:", category);
  
    // Clear the leaderboard before updating
    this.leaderboard = [];
  
    // Get all quizzes in the selected category
    const quizzesInCategory = this.quizzes
      .filter(q => q.category === category)
      .map(q => Number(q.id)); // Ensure IDs are numbers
  
    // console.log("Quizzes in category:", quizzesInCategory);
  
    // Log all quizResponses before filtering
    // console.log("All quizResponses:", this.quizResponses);
  
    // Ensure response.quizId is converted to number before filtering
    const quizResponses = this.quizResponses.filter(response =>
      quizzesInCategory.includes(Number(response.quizId))
    );
  
    // console.log("Filtered quizResponses:", quizResponses);
  
    if (quizResponses.length === 0) {
      // console.warn("No quiz responses found for this category.");
      return; // Exit early to prevent unnecessary processing
    }
  
    const userScores: { [userId: number]: number } = {};
  
    quizResponses.forEach(response => {
      userScores[response.userId] = (userScores[response.userId] || 0) + response.score;
    });
  
    const usernameRequests: Observable<LeaderboardEntry>[] = Object.keys(userScores).map(userId => {
      return this.authService.getUsernameById(+userId).pipe(
        map(username => ({
          userId: +userId,
          username,
          quizCategory: category,
          score: userScores[+userId]
        }))
      );
    });
  
    forkJoin(usernameRequests).subscribe(entries => {
      this.leaderboard = entries.sort((a, b) => b.score - a.score);
      // console.log("Updated Leaderboard:", this.leaderboard);
    });
  }    

}
