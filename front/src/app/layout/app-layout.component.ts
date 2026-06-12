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
    <div class="app-shell">
      <app-header></app-header>
      <app-sidebar></app-sidebar>
      
      <main class="app-content" [ngClass]="{'app-content--expanded': !layoutService.sidebarActive()}">
        <router-outlet></router-outlet>
      </main>

      <div class="layout-mask md:hidden" *ngIf="layoutService.sidebarActive()" (click)="layoutService.closeSidebar()"></div>
    </div>
  `
})
export class AppLayoutComponent {
  layoutService = inject(LayoutService);
}
