import { Component, OnInit } from '@angular/core';
import { LayoutService } from './services/layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'AmigoPet',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-line', routerLink: ['/'] },
                    { label: 'Tutores', icon: 'pi pi-fw pi-users', routerLink: ['/tutores'] },
                    { label: 'Pets', icon: 'pi pi-fw pi-heart', routerLink: ['/pets'] },
                    { label: 'Agendamentos', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/agendamentos'] }
                ]
            },
            {
                label: 'Operacao',
                items: [
                    { label: 'Servicos', icon: 'pi pi-fw pi-briefcase', routerLink: ['/servicos'] },
                    { label: 'Produtos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/produtos'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user-plus', routerLink: ['/usuarios'] }
                ]
            }
        ];
    }
}
