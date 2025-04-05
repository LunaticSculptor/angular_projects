import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  templateUrl: './create-quiz.component.html',
  imports: [FormsModule, CommonModule]
})
export class CreateQuizComponent {
  quiz = {
    category: '',
    maxScore: 100,
    maxTime: 600,
    questions: [] as any[]
  };

  constructor(private http: HttpClient, private router: Router) {}

  addQuestion() {
    this.quiz.questions.push({
      id: this.quiz.questions.length + 1,
      type: 'mcq',
      title: '',
      description: '',
      options: [],
      correctAnswer: '',
      marksIfCorrect: 10,
      negativeMark: 2
    });
  }

  addOption(question: any) {
    if (!Array.isArray(question.options)) {
      question.options = []; // Ensure options array exists
    }
    question.options.push('');
  }

  updateOption(question: any, index: number, value: string) {
    question.options = [...question.options];
    // console.log(value + " " + index)
    question.options[index] = value;
  }
  trackByIndex(index: number, _item: any): number {
    return index;
  }

  removeOption(question: any, index: number) {
    question.options.splice(index, 1);
  }

  removeQuestion(index: number) {
    this.quiz.questions.splice(index, 1);
  }

  submitQuiz() {
    if (!this.quiz.category.trim() || this.quiz.questions.length === 0) {
      alert('Please fill all required fields and add at least one question.');
      return;
    }
  
    // Fetch existing quizzes to determine the next numeric ID
    this.http.get<any[]>('http://localhost:3000/quizzes').subscribe((quizzes) => {
      const newId = quizzes.length > 0 
        ? Math.max(...quizzes.map(q => Number(q.id))) + 1  // Ensure numeric ID
        : 1;
  
      const quizWithId = { ...this.quiz, id: newId.toString() };  // Store as string for compatibility
  
      this.http.post('http://localhost:3000/quizzes', quizWithId).subscribe(() => {
        alert('Quiz created successfully!');
        this.router.navigate(['/quizzes']);
      });
    });
  }  
}
