import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, ConfirmDialogModule],
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
  `
})
export class AppComponent {}
