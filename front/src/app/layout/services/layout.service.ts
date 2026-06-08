import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidebarActive = signal(true);

  toggleSidebar() {
    this.sidebarActive.update(active => !active);
  }

  closeSidebar() {
    this.sidebarActive.set(false);
  }

  openSidebar() {
    this.sidebarActive.set(true);
  }
}
