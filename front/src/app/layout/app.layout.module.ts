import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppLayoutComponent } from './app.layout.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppMenuComponent } from './app.menu.component';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppSidebarComponent,
        AppMenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        ButtonModule,
        InputSwitchModule,
        RadioButtonModule,
        RippleModule,
        SidebarModule
    ],
    exports: [
        AppLayoutComponent
    ]
})
export class AppLayoutModule {}
