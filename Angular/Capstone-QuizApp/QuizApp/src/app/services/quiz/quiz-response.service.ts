import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { QuizResponse } from '../../models/quiz-response';

@Injectable({
  providedIn: 'root',
})
export class QuizResponseService {
  private baseUrl = 'http://localhost:3000/quizResponses';

  constructor(private http: HttpClient) {}

  // Get all quiz responses
  getAllResponses(): Observable<QuizResponse[]> {
    return this.http.get<QuizResponse[]>(this.baseUrl);
  }

  // Get quiz responses for a specific user
  getResponsesByUserId(userId: number): Observable<QuizResponse[]> {
    // console.log('Url: ', `${this.baseUrl}?userId=${userId}`)
    return this.http.get<QuizResponse[]>(`${this.baseUrl}?userId=${userId}`);
  }

  // Get a specific quiz response by ID
  getResponseById(responseId: number): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(`${this.baseUrl}/${responseId}`);
  }

  // Get a specific quiz response by quiz ID and user ID
  getResponseByQuiz(quizId: number, userId: number): Observable<QuizResponse | null> {
    return this.http.get<QuizResponse[]>(`${this.baseUrl}?quizId=${quizId}&userId=${userId}`)
      .pipe(map(responses => responses.length > 0 ? responses[0] : null)); // Return first response or null
  }

  // Submit a new quiz response
  submitQuizResponse(response: QuizResponse): Observable<QuizResponse> {
    return this.http.post<QuizResponse>(this.baseUrl, response);
  }
}
