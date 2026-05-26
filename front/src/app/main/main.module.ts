import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PetsComponent } from './pet/pets.component';
import { TutorsComponent } from './tutor/tutors.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        RouterModule.forChild([
            { path: 'pets', component: PetsComponent },
            { path: 'tutors', component: TutorsComponent },
            { path: '**', redirectTo: 'pets' }
        ])
    ],
    declarations: [PetsComponent, TutorsComponent],
    providers: [MessageService, ConfirmationService]
})
export class MainModule {}
