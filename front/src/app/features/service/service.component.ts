import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { Service } from '../../shared/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
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
    InputTextarea, InputNumberModule, DialogModule, ConfirmDialogModule,
    ToastModule, FormsModule, ReactiveFormsModule
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="amigopet-page">
      <section class="module-hero module-hero--service">
        <div class="module-hero__copy">
          <span class="module-eyebrow"><i class="pi pi-briefcase"></i> Servicos</span>
          <h1>Gerenciamento de Servicos</h1>
          <p>Organize atendimentos, banho, tosa e demais cuidados oferecidos aos pets.</p>
        </div>
        <img src="assets/images/servicos-img.jpeg" alt="Servicos AmigoPet" />
      </section>

      <div class="amigopet-card">
        <div class="module-toolbar">
          <div>
            <span class="module-eyebrow"><i class="pi pi-sparkles"></i> Atendimento, banho e tosa</span>
            <h2>Servicos cadastrados</h2>
          </div>
          <button pButton label="Novo Servico" icon="pi pi-plus" (click)="openNew()"></button>
        </div>

        <div class="service-card-grid" *ngIf="services().length; else emptyServices">
          <article class="service-card" *ngFor="let service of services()">
            <div class="service-card__icon">
              <i [class]="getServiceIcon(service.name)"></i>
            </div>
            <div class="service-card__body">
              <h3>{{ service.name }}</h3>
              <p>{{ service.description || 'Servico disponivel para agendamento.' }}</p>
              <strong>{{ service.price | currency:'BRL' }}</strong>
            </div>
            <div class="service-card__actions">
              <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editService(service)"></button>
              <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deleteService(service)"></button>
            </div>
          </article>
        </div>

        <ng-template #emptyServices>
          <div class="empty-state">
            <i class="pi pi-briefcase"></i>
            <strong>Nenhum servico cadastrado ainda</strong>
            <span>Adicione servicos para montar sua agenda de atendimento.</span>
          </div>
        </ng-template>
      </div>

      <p-dialog [(visible)]="serviceDialog" [style]="{width: '450px'}" [header]="service.id ? 'Editar Servico' : 'Novo Servico'" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <form [formGroup]="serviceForm">
            <div class="field mb-3">
              <label for="name">Nome</label>
              <input type="text" pInputText id="name" formControlName="name" required />
            </div>
            <div class="field mb-3">
              <label for="description">Descricao</label>
              <textarea pInputTextarea id="description" formControlName="description" rows="3"></textarea>
            </div>
            <div class="field mb-3">
              <label for="price">Preco</label>
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

  getServiceIcon(name = '') {
    const normalizedName = name.toLowerCase();
    if (normalizedName.includes('banho')) return 'pi pi-sparkles';
    if (normalizedName.includes('tosa')) return 'pi pi-scissors';
    return 'pi pi-briefcase';
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
      header: 'Confirmar Exclusao',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceService.delete(service.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Servico excluido' });
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Servico atualizado' });
          this.loadServices();
          this.hideDialog();
        }
      });
    } else {
      this.serviceService.create(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Servico criado' });
          this.loadServices();
          this.hideDialog();
        }
      });
    }
  }
}
