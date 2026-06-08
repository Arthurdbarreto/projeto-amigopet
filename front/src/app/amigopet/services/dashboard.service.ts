import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DashboardSummary } from '../models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private api: ApiService) { }

    load(): Observable<any> {
        return forkJoin({
            tutores: this.api.list<any>('tutores'),
            pets: this.api.list<any>('pets'),
            servicos: this.api.list<any>('servicos'),
            produtos: this.api.list<any>('produtos'),
            agendamentos: this.api.list<any>('agendamentos')
        }).pipe(
            map((data) => {
                const today = new Date().toDateString();
                const summary: DashboardSummary = {
                    totalPets: data.pets.length,
                    totalTutores: data.tutores.length,
                    totalServicos: data.servicos.length,
                    totalProdutos: data.produtos.length,
                    agendamentosHoje: data.agendamentos.filter((item: any) => new Date(item.dataHora).toDateString() === today).length
                };

                return {
                    ...data,
                    summary,
                    ultimosAgendamentos: [...data.agendamentos].sort((a: any, b: any) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()).slice(0, 5),
                    produtosEstoqueBaixo: data.produtos.filter((produto: any) => Number(produto.estoque) <= 5).slice(0, 6),
                    atividades: this.buildActivities(data.agendamentos, data.pets, data.produtos),
                    weeklyChart: this.buildWeeklyChart(data.agendamentos)
                };
            })
        );
    }

    private buildWeeklyChart(agendamentos: any[]) {
        const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        const values = new Array(7).fill(0);

        agendamentos.forEach((item) => {
            const day = new Date(item.dataHora).getDay();
            const index = day === 0 ? 6 : day - 1;
            values[index] += 1;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Agendamentos',
                    data: values,
                    borderColor: '#6D4AFF',
                    backgroundColor: 'rgba(109, 74, 255, 0.16)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };
    }

    private buildActivities(agendamentos: any[], pets: any[], produtos: any[]) {
        return [
            ...agendamentos.slice(0, 3).map((item) => ({ icon: 'pi-calendar', title: 'Agendamento atualizado', text: this.nameOf(item.petId) || 'Pet agendado' })),
            ...pets.slice(0, 2).map((item) => ({ icon: 'pi-heart', title: 'Pet cadastrado', text: item.nome })),
            ...produtos.filter((item) => Number(item.estoque) <= 5).slice(0, 2).map((item) => ({ icon: 'pi-box', title: 'Estoque baixo', text: item.nome }))
        ].slice(0, 6);
    }

    nameOf(value: any): string {
        return typeof value === 'object' && value ? value.nome : value;
    }
}
