import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CrudConfig, FieldConfig } from '../../models';
import { CrudConfigService } from '../../services/crud-config.service';

@Component({
    selector: 'app-crud-page',
    templateUrl: './crud-page.component.html'
})
export class CrudPageComponent implements OnInit {
    config!: CrudConfig;
    items: any[] = [];
    form!: FormGroup;
    dialogVisible = false;
    loading = false;
    saving = false;
    editingItem: any = null;
    options: Record<string, any[]> = {
        sexo: [
            { label: 'Macho', value: 'MACHO' },
            { label: 'Fêmea', value: 'FEMEA' }
        ],
        status: [
            { label: 'Agendado', value: 'AGENDADO' },
            { label: 'Confirmado', value: 'CONFIRMADO' },
            { label: 'Em atendimento', value: 'EM_ATENDIMENTO' },
            { label: 'Concluído', value: 'CONCLUIDO' },
            { label: 'Cancelado', value: 'CANCELADO' },
            { label: 'Não compareceu', value: 'NAO_COMPARECEU' }
        ]
    };

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private api: ApiService,
        private configService: CrudConfigService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.config = this.configService.get(data['resource']);
            this.buildForm();
            this.loadOptions();
            this.load();
        });
    }

    get tableFields(): FieldConfig[] {
        return this.config.fields.filter((field) => field.table);
    }

    buildForm(): void {
        const controls: any = {};
        this.config.fields.forEach((field) => {
            controls[field.name] = ['', field.required ? Validators.required : []];
        });
        this.form = this.fb.group(controls);
    }

    loadOptions(): void {
        const requests: any = {};
        const externalKeys = [...new Set(this.config.fields.map((field) => field.optionsKey).filter(Boolean))]
            .filter((key) => key && !this.options[key]);

        externalKeys.forEach((key) => requests[key as string] = this.api.list<any>(key as string));

        if (!Object.keys(requests).length) {
            return;
        }

        forkJoin(requests).subscribe({
            next: (response) => this.options = { ...this.options, ...response },
            error: () => this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Algumas listas auxiliares não foram carregadas.' })
        });
    }

    load(): void {
        this.loading = true;
        this.api.list<any>(this.config.resource).subscribe({
            next: (items) => {
                this.items = items;
                this.loading = false;
            },
            error: () => {
                this.items = [];
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os dados.' });
            }
        });
    }

    openNew(): void {
        this.editingItem = null;
        this.form.reset();
        if (this.config.resource === 'agendamentos') {
            this.form.patchValue({ status: 'AGENDADO' });
        }
        this.dialogVisible = true;
    }

    edit(item: any): void {
        this.editingItem = item;
        const patch: any = {};

        this.config.fields.forEach((field) => {
            const value = item[field.name];
            patch[field.name] = field.type === 'date' && value ? new Date(value) : this.extractValue(value, field);
        });

        this.form.patchValue(patch);
        this.dialogVisible = true;
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha os campos obrigatórios.' });
            return;
        }

        const payload = this.normalizePayload(this.form.getRawValue());
        const request = this.editingItem
            ? this.api.update<any>(this.config.resource, this.editingItem[this.config.idField], payload)
            : this.api.create<any>(this.config.resource, payload);

        this.saving = true;
        request.subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro salvo.' });
                this.dialogVisible = false;
                this.saving = false;
                this.load();
            },
            error: () => {
                this.saving = false;
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar o registro.' });
            }
        });
    }

    confirmRemove(item: any): void {
        this.confirmationService.confirm({
            message: 'Deseja remover este registro?',
            header: 'Confirmar exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Remover',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => this.remove(item)
        });
    }

    remove(item: any): void {
        this.api.remove(this.config.resource, item[this.config.idField]).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro removido.' });
                this.load();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível remover o registro.' })
        });
    }

    displayValue(item: any, field: FieldConfig): string {
        const value = item[field.name];

        if (field.type === 'date' && value) {
            return new Date(value).toLocaleString('pt-BR');
        }

        if (field.currency && value !== undefined && value !== null) {
            return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        if (typeof value === 'object' && value) {
            return value.nome || value.label || value._id;
        }

        const option = this.options[field.optionsKey || '']?.find((itemOption) => itemOption.value === value);
        return option?.label || value || '-';
    }

    isInvalid(field: FieldConfig): boolean {
        const control = this.form.get(field.name);
        return !!control && control.invalid && control.touched;
    }

    private normalizePayload(payload: any): any {
        const normalized = { ...payload };

        this.config.fields.forEach((field) => {
            if (field.type === 'date' && normalized[field.name]) {
                normalized[field.name] = new Date(normalized[field.name]).toISOString();
            }
        });

        return normalized;
    }

    private extractValue(value: any, field: FieldConfig): any {
        if (typeof value === 'object' && value) {
            return value[field.optionValue || '_id'] || value._id;
        }
        return value;
    }
}
