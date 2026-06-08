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
  selector: 'app-register',
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
      <p-card class="w-full" styleClass="shadow-2" [style]="{'max-width': '450px'}">
        <div class="text-center mb-5">
          <div class="text-primary text-3xl font-bold mb-3">AmigoPet</div>
          <span class="text-600 font-medium">Crie sua conta para gerenciar seu PetShop.</span>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="name" class="font-medium">Nome Completo</label>
            <input pInputText id="name" formControlName="name" placeholder="Seu nome" class="w-full" />
          </div>

          <div class="flex flex-column gap-2">
            <label for="email" class="font-medium">E-mail</label>
            <input pInputText id="email" formControlName="email" type="email" placeholder="seu@email.com" class="w-full" />
          </div>

          <div class="flex flex-column gap-2">
            <label for="password" class="font-medium">Senha</label>
            <p-password id="password" formControlName="password" [toggleMask]="true" styleClass="w-full" inputStyleClass="w-full" placeholder="Mínimo 6 caracteres"></p-password>
          </div>

          <p-message *ngIf="error" severity="error" [text]="error"></p-message>
          <p-message *ngIf="success" severity="success" text="Conta criada! Redirecionando..."></p-message>

          <button pButton label="Criar Conta" type="submit" [loading]="loading" [disabled]="registerForm.invalid" class="w-full mt-2"></button>

          <div class="text-center mt-3">
            <span class="text-600">Já tem uma conta? </span>
            <a routerLink="/auth/login" class="text-primary font-bold no-underline hover:underline">Fazer Login</a>
          </div>
        </form>
      </p-card>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  error = '';
  success = false;

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Falha ao realizar cadastro';
          this.loading = false;
        }
      });
    }
  }
}
