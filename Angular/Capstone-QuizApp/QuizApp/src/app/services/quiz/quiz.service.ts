  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Quiz } from '../../models/quiz';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class QuizService {

    private baseUrl = 'http://localhost:3000/quizzes';
    constructor(private http: HttpClient) {}

    getQuizzes(): Observable<Quiz[]> {
      return this.http.get<Quiz[]>(this.baseUrl);
    }

    getQuizById(id: number): Observable<Quiz> {
      console.log('Get quiz called:', `${this.baseUrl}/${id}`)
      return this.http.get<Quiz>(`${this.baseUrl}/${id}`);
    }
  }
