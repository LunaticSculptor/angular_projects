import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { adminsOnlyGuard } from './guards/admins-only/admins-only.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => 
            import('./pages/login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => 
            import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        canActivate: [authGuard],
        canActivateChild: [roleGuard],
        children: [
            // {
            //     path: '',
            //     redirectTo: 'dashboard/reports',
            //     pathMatch: 'full',
            // },
            {
                path: 'reports',
                loadComponent: () => 
                    import('./pages/dashboard/reports/reports.component').then((c)=>c.ReportsComponent),
                data: {role: 'manager'},
            },
            {
                path: 'projects',
                data: {role: 'manager'},
                children: [
                    {
                        path: '',
                        loadComponent: () => 
                            import('./pages/dashboard/projects/projects.component').then((c)=>c.ProjectsComponent),
                    },
                    {
                        path: ':id/edit',
                        loadComponent: () => 
                            import('./pages/dashboard/projects/edit-project/edit-project.component').then((c)=>c.EditProjectComponent),
                        canDeactivate: [unsavedChangesGuard],
                    }
                ]
            }
        ]
    },
    {
        path: 'settings',
        loadComponent: () => 
            import('./pages/settings/settings.component').then((c) => c.SettingsComponent),
        canMatch: [adminsOnlyGuard],
    },
    {
        path: '**',
        redirectTo: '/login',
    }
];
