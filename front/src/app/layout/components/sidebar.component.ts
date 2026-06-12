import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { AuthService } from '../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <aside class="app-sidebar" [ngClass]="{'active': layoutService.sidebarActive()}">
      <div class="app-brand">
        <span class="app-brand__mark"><i class="pi pi-heart-fill"></i></span>
        <span>AmigoPet</span>
      </div>

      <nav class="app-nav">
        <a *ngFor="let item of menuItems" [routerLink]="item.routerLink" routerLinkActive="active-link" class="app-nav__item">
          <i [class]="item.icon"></i>
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <div class="app-tip">
        <i class="pi pi-heart-fill"></i>
        <strong>Dica AmigoPet</strong>
        <span>Mantenha os dados dos clientes sempre atualizados.</span>
      </div>

      <button pButton icon="pi pi-sign-out" label="Sair" class="p-button-text app-logout" (click)="authService.logout()"></button>
    </aside>
  `
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);

  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/main/dashboard' },
    { label: 'Tutores', icon: 'pi pi-users', routerLink: '/main/tutors' },
    { label: 'Pets', icon: 'pi pi-heart', routerLink: '/main/pets' },
    { label: 'Servicos', icon: 'pi pi-briefcase', routerLink: '/main/services' },
    { label: 'Produtos', icon: 'pi pi-shopping-bag', routerLink: '/main/products' },
    { label: 'Agendamentos', icon: 'pi pi-calendar', routerLink: '/main/appointments' }
  ];
}
