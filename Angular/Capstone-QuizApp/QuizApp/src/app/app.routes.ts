import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth-guard/auth-guard.guard';
import { TakeQuizComponent } from './pages/take-quiz/take-quiz.component';
import { quizAccessGuard } from './guards/quiz-access/quiz-access.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'quizzes', component: QuizzesComponent, canActivate: [authGuard] },
    { path: 'create', component: CreateQuizComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'leaderboard', component: LeaderboardComponent, canActivate: [authGuard] },
    { path: 'take-quiz/:id', component: TakeQuizComponent, canActivate: [authGuard, quizAccessGuard] },
    { path: 'about', component: AboutComponent },
];
