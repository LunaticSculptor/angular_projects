import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth/auth.guard';
import { adminGuard } from './guards/admin/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            // { path: '', redirectTo: 'book-appointment', pathMatch: 'full' },
            { 
                path: 'book-appointment', 
                loadComponent: () => import('./pages/appointment-booking/appointment-booking.component').then(m => m.AppointmentBookingComponent) 
            },
            { 
                path: 'appointment-history', 
                loadComponent: () => import('./pages/appointment-history/appointment-history.component').then(m => m.AppointmentHistoryComponent) 
            },
            { 
                path: 'admin-interface', 
                loadComponent: () => import('./pages/admin-interface/admin-interface.component').then(m => m.AdminInterfaceComponent),
                canActivate: [adminGuard], 
            }
        ]
    },
    { 
        path: '**', 
        component: NotFoundComponent,
        // loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) 
    }
];
