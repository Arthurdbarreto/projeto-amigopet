import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { SidebarComponent } from './components/sidebar.component';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <app-sidebar></app-sidebar>
      
      <main class="layout-content transition-all transition-duration-300 min-h-screen" 
            [ngStyle]="{'margin-left': layoutService.sidebarActive() ? '250px' : '0'}"
            style="padding-top: 80px; padding-left: 2rem; padding-right: 2rem; padding-bottom: 2rem;">
        <router-outlet></router-outlet>
      </main>

      <div class="layout-mask md:hidden" 
           *ngIf="layoutService.sidebarActive()" 
           (click)="layoutService.closeSidebar()"
           style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 3;">
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      background-color: var(--surface-ground);
    }
    @media (max-width: 768px) {
      .layout-content {
        margin-left: 0 !important;
      }
    }
  `]
})
export class AppLayoutComponent {
  layoutService = inject(LayoutService);
}
