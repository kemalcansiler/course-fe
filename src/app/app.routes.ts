import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard) },
  {
    path: 'course/:id',
    loadComponent: () => import('./pages/course-detail/course-detail').then((c) => c.CourseDetail),
  },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then((c) => c.Login) },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register').then((c) => c.Register),
  },
];
