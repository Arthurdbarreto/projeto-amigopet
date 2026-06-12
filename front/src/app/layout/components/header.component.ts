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
    <header class="app-header">
      <div class="app-header__search">
        <i class="pi pi-search"></i>
        <input type="text" placeholder="Buscar..." />
      </div>

      <div class="app-header__actions">
        <button pButton icon="pi pi-bars" class="p-button-text p-button-rounded app-menu-toggle" (click)="layoutService.toggleSidebar()"></button>
        <button pButton icon="pi pi-bell" class="p-button-text p-button-rounded"></button>
        <div class="app-user">
          <div class="app-user__avatar">{{ userInitials }}</div>
          <div>
            <strong>{{ authService.currentUser()?.name || 'Administrador' }}</strong>
            <span>{{ authService.currentUser()?.email || 'admin@amigopet.com.br' }}</span>
          </div>
        </div>
        <button pButton icon="pi pi-sign-out" class="p-button-text p-button-rounded" (click)="authService.logout()"></button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);

  get userInitials() {
    const name = this.authService.currentUser()?.name || 'Administrador';
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }
}
