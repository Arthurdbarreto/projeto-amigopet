import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    loading = false;

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) { }

    login(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe e-mail e senha.' });
            return;
        }

        this.loading = true;
        this.authService.login(this.form.getRawValue() as any).subscribe({
            next: () => this.router.navigate(['/']),
            error: () => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Login não realizado', detail: 'Verifique suas credenciais.' });
            },
            complete: () => this.loading = false
        });
    }
}
