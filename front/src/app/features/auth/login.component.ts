import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule,
    InputTextModule, 
    PasswordModule, 
    ButtonModule, 
    CardModule,
    MessageModule
  ],
  template: `
    <div class="flex align-items-center justify-content-center min-h-screen bg-surface-ground px-4">
      <p-card class="w-full" styleClass="shadow-2" [style]="{'max-width': '400px'}">
        <div class="text-center mb-5">
          <div class="text-primary text-3xl font-bold mb-3">AmigoPet</div>
          <span class="text-600 font-medium">Bem-vindo! Faça login para continuar.</span>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="email" class="font-medium">E-mail</label>
            <input pInputText id="email" formControlName="email" type="email" placeholder="seu@email.com" class="w-full" />
            <p-message *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" severity="error" text="E-mail inválido"></p-message>
          </div>

          <div class="flex flex-column gap-2">
            <label for="password" class="font-medium">Senha</label>
            <p-password id="password" formControlName="password" [toggleMask]="true" [feedback]="false" styleClass="w-full" inputStyleClass="w-full" placeholder="Sua senha"></p-password>
          </div>

          <p-message *ngIf="error" severity="error" [text]="error"></p-message>

          <button pButton label="Entrar" type="submit" [loading]="loading" [disabled]="loginForm.invalid" class="w-full mt-2"></button>

          <div class="text-center mt-3">
            <span class="text-600">Não tem uma conta? </span>
            <a routerLink="/auth/register" class="text-primary font-bold no-underline hover:underline">Cadastre-se</a>
          </div>
        </form>
      </p-card>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = false;
  error = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/main']),
        error: (err) => {
          this.error = err.error?.message || 'Falha ao realizar login';
          this.loading = false;
        }
      });
    }
  }
}
