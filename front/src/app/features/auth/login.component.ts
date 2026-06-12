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
    <div class="login-page">
      <section class="login-shell">
        <div class="login-visual">
          <div class="brand-hero">
            <div class="brand-paw"><i class="pi pi-heart-fill"></i></div>
            <h1>Amigo<span>Pet</span></h1>
            <p>Cuidado e carinho para<br />seu melhor amigo</p>
          </div>
          <img src="assets/images/login-img.jpeg" alt="Clinica veterinaria AmigoPet" />
          <span class="decor-paw decor-paw--one">●●</span>
          <span class="decor-paw decor-paw--two">●●</span>
          <span class="decor-paw decor-paw--three">●●</span>
        </div>

        <div class="login-panel">
          <div class="mb-5">
            <h2>Bem-vindo de volta!</h2>
            <p>Faca login para acessar sua conta</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
            <div class="flex flex-column gap-2">
              <label for="email" class="font-medium">E-mail</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-envelope"></i>
                <input pInputText id="email" formControlName="email" type="email" placeholder="seu@email.com" class="w-full" />
              </span>
              <p-message *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" severity="error" text="E-mail invalido"></p-message>
            </div>

            <div class="flex flex-column gap-2">
              <label for="password" class="font-medium">Senha</label>
              <span class="p-input-icon-left w-full login-password">
                <i class="pi pi-lock"></i>
                <p-password id="password" formControlName="password" [toggleMask]="true" [feedback]="false" styleClass="w-full" inputStyleClass="w-full" placeholder="Sua senha"></p-password>
              </span>
            </div>
            <a class="forgot-link" href="#">Esqueceu sua senha?</a>

            <p-message *ngIf="error" severity="error" [text]="error"></p-message>

            <button pButton label="Entrar" type="submit" [loading]="loading" [disabled]="loginForm.invalid" class="w-full mt-2"></button>

            <div class="login-divider"><span>ou</span></div>

            <button pButton type="button" class="google-button" [outlined]="true">
              <span class="google-mark">G</span>
              <span>Entrar com Google</span>
            </button>

            <div class="login-register">
              <span>Nao tem uma conta? </span>
              <a routerLink="/auth/register">Cadastre-se</a>
            </div>
          </form>
        </div>
      </section>
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
