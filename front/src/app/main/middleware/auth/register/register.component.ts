import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    loading = false;
    perfis = [
        { label: 'Administrador', value: 'ADMIN' },
        { label: 'Atendente', value: 'ATENDENTE' },
        { label: 'Veterinário', value: 'VETERINARIO' },
        { label: 'Estoque', value: 'ESTOQUE' }
    ];

    form = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        perfil: ['ATENDENTE', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) { }

    register(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha os dados do usuário.' });
            return;
        }

        this.loading = true;
        this.authService.register(this.form.getRawValue() as any).subscribe({
            next: () => this.router.navigate(['/']),
            error: () => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Cadastro não realizado', detail: 'Verifique os dados informados.' });
            },
            complete: () => this.loading = false
        });
    }
}
