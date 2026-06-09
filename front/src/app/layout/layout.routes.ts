import { Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'tutors',
        loadComponent: () => import('../features/tutor/tutor.component').then(c => c.TutorComponent)
      },
      {
        path: 'pets',
        loadComponent: () => import('../features/pet/pet.component').then(c => c.PetComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('../features/service/service.component').then(c => c.ServiceComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('../features/product/product.component').then(c => c.ProductComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('../features/appointment/appointment.component').then(c => c.AppointmentComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
