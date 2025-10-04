import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'course/:id',
    loadComponent: () => import('./pages/course-detail/course-detail').then((c) => c.CourseDetail),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then((c) => c.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register').then((c) => c.Register),
    canActivate: [guestGuard],
  },
];
