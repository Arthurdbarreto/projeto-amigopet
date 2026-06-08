import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../../core/services/appointment.service';
import { PetService } from '../../core/services/pet.service';
import { ServiceService } from '../../core/services/service.service';
import { Appointment, Pet, Service as PetServiceType } from '../../shared/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, InputTextModule, 
    DialogModule, ConfirmDialogModule, ToastModule, FormsModule, 
    ReactiveFormsModule, DropdownModule, CalendarModule, TagModule
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h1 class="text-2xl font-bold m-0">Gerenciamento de Agendamentos</h1>
        <button pButton label="Novo Agendamento" icon="pi pi-plus" (click)="openNew()"></button>
      </div>

      <p-table [value]="appointments()" [rows]="10" [paginator]="true" [loading]="loading()" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Pet</th>
            <th>Tutor</th>
            <th>Serviço</th>
            <th>Data/Hora</th>
            <th>Status</th>
            <th style="width: 10rem">Ações</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-app>
          <tr>
            <td>{{ app.petId?.name }}</td>
            <td>{{ app.tutorId?.name }}</td>
            <td>{{ app.serviceId?.name }}</td>
            <td>{{ app.dataHora | date:'dd/MM/yyyy HH:mm' }}</td>
            <td>
              <p-tag [value]="app.status" [severity]="getStatusSeverity(app.status)"></p-tag>
            </td>
            <td>
              <div class="flex gap-2">
                <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editAppointment(app)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deleteAppointment(app)"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog [(visible)]="appointmentDialog" [style]="{width: '450px'}" [header]="appointment.id ? 'Editar Agendamento' : 'Novo Agendamento'" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <form [formGroup]="appointmentForm">
            <div class="field mb-3">
              <label for="petId">Pet</label>
              <p-dropdown id="petId" [options]="pets()" optionLabel="name" optionValue="id" formControlName="petId" [filter]="true" placeholder="Selecione o Pet"></p-dropdown>
            </div>
            <div class="field mb-3">
              <label for="serviceId">Serviço</label>
              <p-dropdown id="serviceId" [options]="services()" optionLabel="name" optionValue="id" formControlName="serviceId" [filter]="true" placeholder="Selecione o Serviço"></p-dropdown>
            </div>
            <div class="field mb-3">
              <label for="dataHora">Data e Hora</label>
              <p-calendar id="dataHora" formControlName="dataHora" [showTime]="true" [showIcon]="true" dateFormat="dd/mm/yy"></p-calendar>
            </div>
            <div class="field mb-3">
              <label for="status">Status</label>
              <p-dropdown id="status" [options]="statusOptions" formControlName="status" placeholder="Selecione"></p-dropdown>
            </div>
          </form>
        </ng-template>

        <ng-template pTemplate="footer">
          <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
          <button pButton label="Salvar" icon="pi pi-check" [disabled]="appointmentForm.invalid" (click)="saveAppointment()"></button>
        </ng-template>
      </p-dialog>

      <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
      <p-toast></p-toast>
    </div>
  `
})
export class AppointmentComponent implements OnInit {
  private appointmentService = inject(AppointmentService);
  private petService = inject(PetService);
  private serviceService = inject(ServiceService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  appointments = signal<Appointment[]>([]);
  pets = signal<Pet[]>([]);
  services = signal<PetServiceType[]>([]);
  loading = signal(false);
  appointmentDialog = false;
  appointment: Partial<Appointment> = {};
  
  statusOptions = [
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Confirmado', value: 'Confirmado' },
    { label: 'Concluido', value: 'Concluido' },
    { label: 'Cancelado', value: 'Cancelado' }
  ];

  appointmentForm = this.fb.group({
    petId: ['', Validators.required],
    serviceId: ['', Validators.required],
    dataHora: [new Date(), Validators.required],
    status: ['Pendente', Validators.required]
  });

  ngOnInit() {
    this.loadAppointments();
    this.loadPets();
    this.loadServices();
  }

  loadAppointments() {
    this.loading.set(true);
    this.appointmentService.getAll().subscribe({
      next: (res) => {
        this.appointments.set(res.appointments);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadPets() {
    this.petService.getAll({ limit: 1000 }).subscribe(res => this.pets.set(res.pets));
  }

  loadServices() {
    this.serviceService.getAll({ limit: 1000 }).subscribe(res => this.services.set(res.services));
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

  openNew() {
    this.appointment = {};
    this.appointmentForm.reset({ dataHora: new Date(), status: 'Pendente' });
    this.appointmentDialog = true;
  }

  editAppointment(app: Appointment) {
    this.appointment = { ...app };
    this.appointmentForm.patchValue({
      petId: (app.petId as any)._id || (app.petId as any).id || app.petId,
      serviceId: (app.serviceId as any)._id || (app.serviceId as any).id || app.serviceId,
      dataHora: new Date(app.dataHora),
      status: app.status
    } as any);
    this.appointmentDialog = true;
  }

  deleteAppointment(app: Appointment) {
    this.confirmationService.confirm({
      message: `Deseja excluir este agendamento?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appointmentService.delete(app.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Agendamento excluído' });
            this.loadAppointments();
          }
        });
      }
    });
  }

  hideDialog() {
    this.appointmentDialog = false;
  }

  saveAppointment() {
    const data = this.appointmentForm.value as Appointment;
    if (this.appointment.id) {
      this.appointmentService.update(this.appointment.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Agendamento atualizado' });
          this.loadAppointments();
          this.hideDialog();
        }
      });
    } else {
      this.appointmentService.create(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Agendamento criado' });
          this.loadAppointments();
          this.hideDialog();
        }
      });
    }
  }
}
