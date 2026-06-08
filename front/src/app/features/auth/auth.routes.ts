import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register.component').then(c => c.RegisterComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
