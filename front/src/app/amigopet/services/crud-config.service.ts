import { Injectable } from '@angular/core';
import { CrudConfig } from '../models';

@Injectable({ providedIn: 'root' })
export class CrudConfigService {
    configs: Record<string, CrudConfig> = {
        tutores: {
            title: 'Tutores',
            subtitle: 'Gerencie responsáveis, contatos e endereços.',
            resource: 'tutores',
            idField: '_id',
            icon: 'pi-users',
            fields: [
                { name: 'nome', label: 'Nome', type: 'text', required: true, table: true },
                { name: 'telefone', label: 'Telefone', type: 'text', required: true, table: true },
                { name: 'contato', label: 'Contato', type: 'text', table: true },
                { name: 'endereco', label: 'Endereço', type: 'text', required: true, table: true }
            ]
        },
        pets: {
            title: 'Pets',
            subtitle: 'Cadastre os animais e vincule cada pet ao tutor.',
            resource: 'pets',
            idField: '_id',
            icon: 'pi-heart',
            fields: [
                { name: 'nome', label: 'Nome', type: 'text', required: true, table: true },
                { name: 'especie', label: 'Espécie', type: 'text', required: true, table: true },
                { name: 'raca', label: 'Raça', type: 'text', table: true },
                { name: 'sexo', label: 'Sexo', type: 'select', required: true, optionsKey: 'sexo', table: true },
                { name: 'tutorId', label: 'Tutor', type: 'select', required: true, optionsKey: 'tutores', optionLabel: 'nome', optionValue: '_id', table: true }
            ]
        },
        servicos: {
            title: 'Serviços',
            subtitle: 'Organize o catálogo de serviços do petshop.',
            resource: 'servicos',
            idField: '_id',
            icon: 'pi-briefcase',
            fields: [
                { name: 'nome', label: 'Nome', type: 'text', required: true, table: true },
                { name: 'descricao', label: 'Descrição', type: 'text', table: true },
                { name: 'preco', label: 'Preço', type: 'number', required: true, table: true, currency: true }
            ]
        },
        produtos: {
            title: 'Produtos',
            subtitle: 'Controle itens, preços e estoque.',
            resource: 'produtos',
            idField: '_id',
            icon: 'pi-shopping-bag',
            fields: [
                { name: 'nome', label: 'Nome', type: 'text', required: true, table: true },
                { name: 'descricao', label: 'Descrição', type: 'text', table: true },
                { name: 'preco', label: 'Preço', type: 'number', required: true, table: true, currency: true },
                { name: 'estoque', label: 'Estoque', type: 'number', required: true, table: true }
            ]
        },
        agendamentos: {
            title: 'Agendamentos',
            subtitle: 'Acompanhe a agenda e o status dos atendimentos.',
            resource: 'agendamentos',
            idField: '_id',
            icon: 'pi-calendar-plus',
            fields: [
                { name: 'tutorId', label: 'Tutor', type: 'select', required: true, optionsKey: 'tutores', optionLabel: 'nome', optionValue: '_id', table: true },
                { name: 'petId', label: 'Pet', type: 'select', required: true, optionsKey: 'pets', optionLabel: 'nome', optionValue: '_id', table: true },
                { name: 'servicoId', label: 'Serviço', type: 'select', required: true, optionsKey: 'servicos', optionLabel: 'nome', optionValue: '_id', table: true },
                { name: 'dataHora', label: 'Data e hora', type: 'date', required: true, table: true },
                { name: 'status', label: 'Status', type: 'select', required: true, optionsKey: 'status', table: true }
            ]
        }
    };

    get(key: string): CrudConfig {
        return this.configs[key];
    }
}
