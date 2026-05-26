import { OnInit, Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li>
                <a routerLink="/" class="p-link flex align-items-center pl-4 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">Dashboard</span>
                </a>
            </li>
            <li>
                <a routerLink="/main/pets" class="p-link flex align-items-center pl-4 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                    <i class="pi pi-heart mr-2"></i>
                    <span class="font-medium">Pets</span>
                </a>
            </li>
            <li>
                <a routerLink="/main/tutors" class="p-link flex align-items-center pl-4 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                    <i class="pi pi-users mr-2"></i>
                    <span class="font-medium">Tutores</span>
                </a>
            </li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'AmigoPet',
                items: [
                    { label: 'Pets', icon: 'pi pi-fw pi-heart', routerLink: ['/main/pets'] },
                    { label: 'Tutores', icon: 'pi pi-fw pi-users', routerLink: ['/main/tutors'] }
                ]
            }
        ];
    }
}
