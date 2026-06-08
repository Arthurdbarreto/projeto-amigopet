import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule],
  template: `
    <aside class="sidebar fixed left-0 bg-white shadow-2 transition-all transition-duration-300 z-4" 
           [ngClass]="{'active': layoutService.sidebarActive()}"
           style="top: 60px; bottom: 0; width: 250px; left: -250px;">
      <nav class="flex flex-column gap-2 p-3">
        <a *ngFor="let item of menuItems" 
           [routerLink]="item.routerLink" 
           routerLinkActive="active-link"
           class="nav-item flex align-items-center gap-3 p-3 border-round text-700 no-underline transition-colors hover:bg-blue-50">
          <i [class]="item.icon" class="text-xl"></i>
          <span class="font-medium">{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar.active {
      left: 0 !important;
    }
    .nav-item.active-link {
      background-color: #f3f0ff !important;
      color: #6D4AFF !important;
      border-left: 4px solid #6D4AFF;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .nav-item i {
      width: 24px;
      text-align: center;
    }
  `]
})
export class SidebarComponent {
  layoutService = inject(LayoutService);

  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/main/dashboard' },
    { label: 'Tutores', icon: 'pi pi-users', routerLink: '/main/tutors' },
    { label: 'Pets', icon: 'pi pi-heart', routerLink: '/main/pets' },
    { label: 'Serviços', icon: 'pi pi-briefcase', routerLink: '/main/services' },
    { label: 'Produtos', icon: 'pi pi-shopping-bag', routerLink: '/main/products' },
    { label: 'Agendamentos', icon: 'pi pi-calendar', routerLink: '/main/appointments' }
  ];
}
