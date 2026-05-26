import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
        ButtonModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
