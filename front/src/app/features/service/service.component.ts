import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { Service } from '../../shared/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, InputTextModule, 
    InputNumberModule, DialogModule, ConfirmDialogModule, ToastModule, 
    FormsModule, ReactiveFormsModule
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h1 class="text-2xl font-bold m-0">Gerenciamento de Serviços</h1>
        <button pButton label="Novo Serviço" icon="pi pi-plus" (click)="openNew()"></button>
      </div>

      <p-table [value]="services()" [rows]="10" [paginator]="true" [loading]="loading()" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th style="width: 10rem">Ações</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-service>
          <tr>
            <td>{{ service.name }}</td>
            <td>{{ service.description }}</td>
            <td>{{ service.price | currency:'BRL' }}</td>
            <td>
              <div class="flex gap-2">
                <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editService(service)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deleteService(service)"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog [(visible)]="serviceDialog" [style]="{width: '450px'}" [header]="service.id ? 'Editar Serviço' : 'Novo Serviço'" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <form [formGroup]="serviceForm">
            <div class="field mb-3">
              <label for="name">Nome</label>
              <input type="text" pInputText id="name" formControlName="name" required />
            </div>
            <div class="field mb-3">
              <label for="description">Descrição</label>
              <textarea pInputTextarea id="description" formControlName="description" rows="3"></textarea>
            </div>
            <div class="field mb-3">
              <label for="price">Preço</label>
              <p-inputNumber id="price" formControlName="price" mode="currency" currency="BRL" locale="pt-BR"></p-inputNumber>
            </div>
          </form>
        </ng-template>

        <ng-template pTemplate="footer">
          <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
          <button pButton label="Salvar" icon="pi pi-check" [disabled]="serviceForm.invalid" (click)="saveService()"></button>
        </ng-template>
      </p-dialog>

      <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
      <p-toast></p-toast>
    </div>
  `
})
export class ServiceComponent implements OnInit {
  private serviceService = inject(ServiceService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  services = signal<Service[]>([]);
  loading = signal(false);
  serviceDialog = false;
  service: Partial<Service> = {};
  
  serviceForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.loading.set(true);
    this.serviceService.getAll().subscribe({
      next: (res) => {
        this.services.set(res.services);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openNew() {
    this.service = {};
    this.serviceForm.reset({ price: 0 });
    this.serviceDialog = true;
  }

  editService(service: Service) {
    this.service = { ...service };
    this.serviceForm.patchValue(service as any);
    this.serviceDialog = true;
  }

  deleteService(service: Service) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${service.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceService.delete(service.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Serviço excluído' });
            this.loadServices();
          }
        });
      }
    });
  }

  hideDialog() {
    this.serviceDialog = false;
  }

  saveService() {
    const data = this.serviceForm.value as Service;
    if (this.service.id) {
      this.serviceService.update(this.service.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Serviço atualizado' });
          this.loadServices();
          this.hideDialog();
        }
      });
    } else {
      this.serviceService.create(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Serviço criado' });
          this.loadServices();
          this.hideDialog();
        }
      });
    }
  }
}
