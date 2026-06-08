import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TagModule],
  template: `
    <div class="grid">
      <!-- Cards -->
      <div class="col-12 md:col-6 lg:col-2" *ngFor="let card of statCards">
        <p-card styleClass="shadow-1 border-round h-full">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">{{ card.label }}</span>
              <div class="text-900 font-bold text-xl">{{ statsSignal()?.cards?.[card.key] || 0 }}</div>
            </div>
            <div class="flex align-items-center justify-content-center border-round" [ngStyle]="{width: '2.5rem', height: '2.5rem', backgroundColor: card.bg, color: card.color}">
              <i [class]="card.icon" class="text-xl"></i>
            </div>
          </div>
        </p-card>
      </div>
      <div class="col-12 md:col-6 lg:col-4">
        <p-card styleClass="shadow-1 border-round h-full">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Agendamentos Hoje</span>
              <div class="text-900 font-bold text-xl">{{ statsSignal()?.cards?.appointmentsToday || 0 }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-calendar text-blue-500 text-xl"></i>
            </div>
          </div>
        </p-card>
      </div>

      <!-- Widgets -->
      <div class="col-12 lg:col-6">
        <p-card header="Últimos Agendamentos" styleClass="shadow-1 border-round">
          <p-table [value]="statsSignal()?.widgets?.latestAppointments || []" [rows]="5" responsiveLayout="scroll">
            <ng-template pTemplate="header">
              <tr>
                <th>Pet</th>
                <th>Serviço</th>
                <th>Status</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
              <tr>
                <td>{{ item.petId?.name }}</td>
                <td>{{ item.serviceId?.name }}</td>
                <td>
                  <p-tag [value]="item.status" [severity]="getStatusSeverity(item.status)"></p-tag>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </p-card>
      </div>

      <div class="col-12 lg:col-6">
        <p-card header="Estoque Baixo" styleClass="shadow-1 border-round">
          <p-table [value]="statsSignal()?.widgets?.lowStockProducts || []" [rows]="5" responsiveLayout="scroll">
            <ng-template pTemplate="header">
              <tr>
                <th>Produto</th>
                <th>Estoque</th>
                <th>Preço</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
              <tr>
                <td>{{ product.name }}</td>
                <td class="text-red-500 font-bold">{{ product.stock }}</td>
                <td>{{ product.price | currency:'BRL' }}</td>
              </tr>
            </ng-template>
          </p-table>
        </p-card>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  statsSignal = signal<any>(null);

  statCards = [
    { label: 'Total Pets', key: 'totalPets', icon: 'pi pi-heart', bg: '#E0E7FF', color: '#4338CA' },
    { label: 'Tutores', key: 'totalTutors', icon: 'pi pi-users', bg: '#FCE7F3', color: '#BE185D' },
    { label: 'Serviços', key: 'totalServices', icon: 'pi pi-briefcase', bg: '#FEF3C7', color: '#B45309' },
    { label: 'Produtos', key: 'totalProducts', icon: 'pi pi-shopping-bag', bg: '#D1FAE5', color: '#047857' }
  ];

  ngOnInit() {
    this.dashboardService.getStats().subscribe(data => {
      this.statsSignal.set(data);
    });
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'Concluido': return 'success';
      case 'Pendente': return 'warning';
      case 'Confirmado': return 'info';
      case 'Cancelado': return 'danger';
      default: return 'info';
    }
  }
}
