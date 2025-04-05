import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { QuizResponseService } from '../../services/quiz/quiz-response.service';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const quizAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const quizResponseService = inject(QuizResponseService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const quizId = Number(route.params['id']);
  const user = authService.getUser();

  if (!user) {
    alert("You must be logged in to take quizzes.");
    router.navigate(['/login']);
    return of(false);
  }

  const { id: userId, role: userRole } = user;

  // ✅ Allow admins to access any quiz
  if (userRole === 'admin') {
    return of(true);
  }

  // ✅ Check if the user has already taken the quiz
  return quizResponseService.getResponseByQuiz(quizId, userId).pipe(
    map(response => {
      if (response) {
        alert("You have already taken this quiz and cannot retake it.");
        router.navigate(['/quizzes']);
        return false;
      }
      return true;
    })
  );
};
