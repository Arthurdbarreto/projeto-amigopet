import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'login', loadChildren: () => import('../../middleware/auth/login/login.module').then(m => m.LoginModule) },
            { path: '**', redirectTo: 'login' }
        ])
    ]
})
export class AuthModule {}
