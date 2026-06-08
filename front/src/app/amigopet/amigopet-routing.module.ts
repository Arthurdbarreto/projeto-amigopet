import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudPageComponent } from './pages/crud-page/crud-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'tutores', component: CrudPageComponent, data: { resource: 'tutores' } },
        { path: 'pets', component: CrudPageComponent, data: { resource: 'pets' } },
        { path: 'servicos', component: CrudPageComponent, data: { resource: 'servicos' } },
        { path: 'produtos', component: CrudPageComponent, data: { resource: 'produtos' } },
        { path: 'agendamentos', component: CrudPageComponent, data: { resource: 'agendamentos' } },
        { path: 'usuarios', loadChildren: () => import('../main/middleware/auth/register/register.module').then(m => m.RegisterModule) }
    ])],
    exports: [RouterModule]
})
export class AmigoPetRoutingModule { }
