import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { LayoutService } from '../services/layout.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <header class="header flex align-items-center justify-content-between px-4 py-2 bg-white shadow-1 fixed top-0 left-0 right-0 z-5" style="height: 60px;">
      <div class="flex align-items-center gap-3">
        <button pButton icon="pi pi-bars" class="p-button-text p-button-rounded text-900" (click)="layoutService.toggleSidebar()"></button>
        <span class="text-2xl font-bold text-primary">AmigoPet</span>
      </div>
      
      <div class="flex align-items-center gap-3">
        <span class="hidden md:inline font-medium text-900">Olá, {{ authService.currentUser()?.name }}</span>
        <button pButton icon="pi pi-sign-out" label="Sair" class="p-button-text p-button-sm" (click)="authService.logout()"></button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      border-bottom: 1px solid #e5e7eb;
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
}
