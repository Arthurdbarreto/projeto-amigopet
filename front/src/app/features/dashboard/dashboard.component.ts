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
    <div class="amigopet-page">
      <section class="dashboard-hero">
        <img src="assets/images/dashboard-img.jpeg" alt="Painel AmigoPet" />
        <div class="dashboard-hero__content">
          <span class="module-eyebrow"><i class="pi pi-home"></i> Visao geral</span>
          <h1>Bem-vindo ao AmigoPet</h1>
          <p>Acompanhe pets, tutores, produtos, servicos e agendamentos com uma leitura rapida do dia.</p>
        </div>
      </section>

      <section class="welcome-band">
        <div>
          <span class="module-eyebrow"><i class="pi pi-sparkles"></i> Operacao do dia</span>
          <h2>Resumo da sua clinica</h2>
        </div>
        <p>Os indicadores abaixo ajudam a identificar a movimentacao principal e os pontos que pedem atencao.</p>
      </section>

      <div class="stats-grid">
        <article class="stat-card" *ngFor="let card of statCards">
          <div class="stat-icon" [ngStyle]="{backgroundColor: card.bg, color: card.color}">
            <i [class]="card.icon"></i>
          </div>
          <div>
            <span>{{ card.label }}</span>
            <strong>{{ statsSignal()?.cards?.[card.key] || 0 }}</strong>
          </div>
        </article>

        <article class="stat-card stat-card--wide">
          <div class="stat-icon" style="background-color: #DBEAFE; color: #2563EB">
            <i class="pi pi-calendar-clock"></i>
          </div>
          <div>
            <span>Agendamentos Hoje</span>
            <strong>{{ statsSignal()?.cards?.appointmentsToday || 0 }}</strong>
          </div>
        </article>
      </div>

      <div class="grid mt-4">
        <div class="col-12 lg:col-6">
          <p-card styleClass="amigopet-card h-full">
            <ng-template pTemplate="header">
              <div class="card-heading"><i class="pi pi-calendar"></i><span>Ultimos Agendamentos</span></div>
            </ng-template>
            <p-table [value]="statsSignal()?.widgets?.latestAppointments || []" [rows]="5" responsiveLayout="scroll">
              <ng-template pTemplate="header">
                <tr>
                  <th>Pet</th>
                  <th>Servico</th>
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
              <ng-template pTemplate="emptymessage">
                <tr>
                  <td colspan="3">
                    <div class="empty-state empty-state--compact">
                      <i class="pi pi-calendar-plus"></i>
                      <span>Nenhum agendamento recente.</span>
                    </div>
                  </td>
                </tr>
              </ng-template>
            </p-table>
          </p-card>
        </div>

        <div class="col-12 lg:col-6">
          <p-card styleClass="amigopet-card h-full">
            <ng-template pTemplate="header">
              <div class="card-heading"><i class="pi pi-box"></i><span>Estoque Baixo</span></div>
            </ng-template>
            <p-table [value]="statsSignal()?.widgets?.lowStockProducts || []" [rows]="5" responsiveLayout="scroll">
              <ng-template pTemplate="header">
                <tr>
                  <th>Produto</th>
                  <th>Estoque</th>
                  <th>Preco</th>
                </tr>
              </ng-template>
              <ng-template pTemplate="body" let-product>
                <tr>
                  <td>{{ product.name }}</td>
                  <td class="text-red-500 font-bold">{{ product.stock }}</td>
                  <td>{{ product.price | currency:'BRL' }}</td>
                </tr>
              </ng-template>
              <ng-template pTemplate="emptymessage">
                <tr>
                  <td colspan="3">
                    <div class="empty-state empty-state--compact">
                      <i class="pi pi-check-circle"></i>
                      <span>Nenhum produto com estoque baixo.</span>
                    </div>
                  </td>
                </tr>
              </ng-template>
            </p-table>
          </p-card>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  statsSignal = signal<any>(null);

  statCards = [
    { label: 'Pets', key: 'totalPets', icon: 'pi pi-heart', bg: '#E0F2FE', color: '#0369A1' },
    { label: 'Tutores', key: 'totalTutors', icon: 'pi pi-users', bg: '#FCE7F3', color: '#BE185D' },
    { label: 'Servicos', key: 'totalServices', icon: 'pi pi-briefcase', bg: '#FEF3C7', color: '#B45309' },
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
