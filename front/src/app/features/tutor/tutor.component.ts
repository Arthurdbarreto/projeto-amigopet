import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TutorService } from '../../core/services/tutor.service';
import { Tutor } from '../../shared/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, InputTextModule, 
    InputTextarea, DialogModule, ConfirmDialogModule, ToastModule, 
    FormsModule, ReactiveFormsModule
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h1 class="text-2xl font-bold m-0">Gerenciamento de Tutores</h1>
        <button pButton label="Novo Tutor" icon="pi pi-plus" (click)="openNew()"></button>
      </div>

      <p-table [value]="tutors()" [rows]="10" [paginator]="true" [loading]="loading()" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Contato</th>
            <th>Endereço</th>
            <th style="width: 10rem">Ações</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-tutor>
          <tr>
            <td>{{ tutor.name }}</td>
            <td>{{ tutor.phone }}</td>
            <td>{{ tutor.contact }}</td>
            <td>{{ tutor.address }}</td>
            <td>
              <div class="flex gap-2">
                <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editTutor(tutor)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deleteTutor(tutor)"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog [(visible)]="tutorDialog" [style]="{width: '450px'}" [header]="tutor.id ? 'Editar Tutor' : 'Novo Tutor'" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <form [formGroup]="tutorForm">
            <div class="field mb-3">
              <label for="name">Nome</label>
              <input type="text" pInputText id="name" formControlName="name" required />
            </div>
            <div class="field mb-3">
              <label for="phone">Telefone</label>
              <input type="text" pInputText id="phone" formControlName="phone" required />
            </div>
            <div class="field mb-3">
              <label for="contact">Contato</label>
              <input type="text" pInputText id="contact" formControlName="contact" />
            </div>
            <div class="field mb-3">
              <label for="address">Endereço</label>
              <textarea pInputTextarea id="address" formControlName="address" rows="3"></textarea>
            </div>
          </form>
        </ng-template>

        <ng-template pTemplate="footer">
          <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
          <button pButton label="Salvar" icon="pi pi-check" [disabled]="tutorForm.invalid" (click)="saveTutor()"></button>
        </ng-template>
      </p-dialog>

      <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
      <p-toast></p-toast>
    </div>
  `
})
export class TutorComponent implements OnInit {
  private tutorService = inject(TutorService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  tutors = signal<Tutor[]>([]);
  loading = signal(false);
  tutorDialog = false;
  tutor: Partial<Tutor> = {};
  tutorForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    contact: [''],
    address: ['']
  });

  ngOnInit() {
    this.loadTutors();
  }

  loadTutors() {
    this.loading.set(true);
    this.tutorService.getAll().subscribe({
      next: (res) => {
        this.tutors.set(res.tutors);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openNew() {
    this.tutor = {};
    this.tutorForm.reset();
    this.tutorDialog = true;
  }

  editTutor(tutor: Tutor) {
    this.tutor = { ...tutor };
    this.tutorForm.patchValue(tutor as any);
    this.tutorDialog = true;
  }

  deleteTutor(tutor: Tutor) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${tutor.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tutorService.delete(tutor.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor excluído' });
            this.loadTutors();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Falha ao excluir' });
          }
        });
      }
    });
  }

  hideDialog() {
    this.tutorDialog = false;
  }

  saveTutor() {
    const data = this.tutorForm.value as Tutor;
    if (this.tutor.id) {
      this.tutorService.update(this.tutor.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor atualizado' });
          this.loadTutors();
          this.hideDialog();
        }
      });
    } else {
      this.tutorService.create(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor criado' });
          this.loadTutors();
          this.hideDialog();
        }
      });
    }
  }
}
