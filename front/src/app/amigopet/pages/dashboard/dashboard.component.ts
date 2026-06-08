import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-amigopet-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    loading = true;
    data: any;
    chartOptions: any;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.chartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#42526E' }
                }
            },
            scales: {
                x: { ticks: { color: '#6B7280' }, grid: { color: '#EDF1F7' } },
                y: { ticks: { color: '#6B7280' }, grid: { color: '#EDF1F7' } }
            }
        };

        this.dashboardService.load().subscribe({
            next: (data) => {
                this.data = data;
                this.loading = false;
            },
            error: () => {
                this.data = {
                    summary: { totalPets: 0, totalTutores: 0, totalServicos: 0, totalProdutos: 0, agendamentosHoje: 0 },
                    weeklyChart: { labels: [], datasets: [] },
                    ultimosAgendamentos: [],
                    produtosEstoqueBaixo: [],
                    atividades: []
                };
                this.loading = false;
            }
        });
    }

    nameOf(value: any): string {
        return typeof value === 'object' && value ? value.nome : value || '-';
    }

    statusClass(status: string): string {
        const map: any = {
            AGENDADO: 'info',
            CONFIRMADO: 'success',
            EM_ATENDIMENTO: 'warning',
            CONCLUIDO: 'success',
            CANCELADO: 'danger',
            NAO_COMPARECEU: 'danger'
        };
        return map[status] || 'info';
    }
}
