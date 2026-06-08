import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { AmigoPetRoutingModule } from './amigopet-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudPageComponent } from './pages/crud-page/crud-page.component';

@NgModule({
    declarations: [
        DashboardComponent,
        CrudPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AmigoPetRoutingModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        ChartModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        InputTextModule,
        ProgressSpinnerModule,
        RippleModule,
        TableModule,
        TagModule,
        ToastModule,
        TooltipModule
    ],
    providers: [ConfirmationService]
})
export class AmigoPetModule { }
