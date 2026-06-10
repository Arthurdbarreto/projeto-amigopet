import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PetService } from '../../core/services/pet.service';
import { TutorService } from '../../core/services/tutor.service';
import { Pet, Tutor } from '../../shared/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, InputTextModule,
    DialogModule, ConfirmDialogModule, ToastModule, FormsModule,
    ReactiveFormsModule, DropdownModule
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="amigopet-page">
      <section class="module-hero module-hero--pet">
        <div class="module-hero__copy">
          <span class="module-eyebrow"><i class="pi pi-heart"></i> Pets</span>
          <h1>Gerenciamento de Pets</h1>
          <p>Cadastre e acompanhe os animais atendidos com informacoes essenciais sempre a mao.</p>
        </div>
        <img src="assets/images/pet-img.jpeg" alt="Pets AmigoPet" />
      </section>

      <div class="amigopet-card">
        <div class="module-toolbar">
          <div>
            <span class="module-eyebrow"><i class="pi pi-list"></i> Lista de pets</span>
            <h2>Pets cadastrados</h2>
          </div>
          <button pButton label="Novo Pet" icon="pi pi-plus" (click)="openNew()"></button>
        </div>

        <p-table [value]="pets()" [rows]="10" [paginator]="true" [loading]="loading()" responsiveLayout="scroll">
          <ng-template pTemplate="header">
            <tr>
              <th>Nome</th>
              <th>Especie</th>
              <th>Raca</th>
              <th>Sexo</th>
              <th>Tutor</th>
              <th style="width: 10rem">Acoes</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-pet>
            <tr>
              <td><i class="pi pi-heart table-icon"></i>{{ pet.name }}</td>
              <td>{{ pet.species }}</td>
              <td>{{ pet.breed }}</td>
              <td>{{ pet.sex }}</td>
              <td><i class="pi pi-user table-icon"></i>{{ pet.tutorId?.name }}</td>
              <td>
                <div class="flex gap-2">
                  <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editPet(pet)"></button>
                  <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deletePet(pet)"></button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="6">
                <div class="empty-state">
                  <i class="pi pi-heart"></i>
                  <strong>Nenhum pet cadastrado ainda</strong>
                  <span>Use o botao Novo Pet para iniciar o cadastro.</span>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <p-dialog [(visible)]="petDialog" [style]="{width: '450px'}" [header]="pet.id ? 'Editar Pet' : 'Novo Pet'" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <form [formGroup]="petForm">
            <div class="field mb-3">
              <label for="name">Nome</label>
              <input type="text" pInputText id="name" formControlName="name" required />
            </div>
            <div class="field mb-3">
              <label for="species">Especie</label>
              <input type="text" pInputText id="species" formControlName="species" required />
            </div>
            <div class="field mb-3">
              <label for="breed">Raca</label>
              <input type="text" pInputText id="breed" formControlName="breed" />
            </div>
            <div class="field mb-3">
              <label for="sex">Sexo</label>
              <p-dropdown id="sex" [options]="sexOptions" formControlName="sex" placeholder="Selecione"></p-dropdown>
            </div>
            <div class="field mb-3">
              <label for="tutorId">Tutor</label>
              <p-dropdown id="tutorId" [options]="tutors()" optionLabel="name" optionValue="id" formControlName="tutorId" [filter]="true" placeholder="Selecione o Tutor"></p-dropdown>
            </div>
          </form>
        </ng-template>

        <ng-template pTemplate="footer">
          <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
          <button pButton label="Salvar" icon="pi pi-check" [disabled]="petForm.invalid" (click)="savePet()"></button>
        </ng-template>
      </p-dialog>

      <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
      <p-toast></p-toast>
    </div>
  `
})
export class PetComponent implements OnInit {
  private petService = inject(PetService);
  private tutorService = inject(TutorService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  pets = signal<Pet[]>([]);
  tutors = signal<Tutor[]>([]);
  loading = signal(false);
  petDialog = false;
  pet: Partial<Pet> = {};

  sexOptions = [
    { label: 'Macho', value: 'Macho' },
    { label: 'F\u00eamea', value: 'F\u00eamea' }
  ];

  petForm = this.fb.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    breed: [''],
    sex: ['Macho', Validators.required],
    tutorId: ['', Validators.required]
  });

  ngOnInit() {
    this.loadPets();
    this.loadTutors();
  }

  loadPets() {
    this.loading.set(true);
    this.petService.getAll().subscribe({
      next: (res) => {
        this.pets.set(res.pets);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadTutors() {
    this.tutorService.getAll({ limit: 1000 }).subscribe(res => {
      this.tutors.set(res.tutors);
    });
  }

  openNew() {
    this.pet = {};
    this.petForm.reset({ sex: 'Macho' });
    this.petDialog = true;
  }

  editPet(pet: Pet) {
    this.pet = { ...pet };
    this.petForm.patchValue({
      ...pet,
      tutorId: (pet.tutorId as any)._id || (pet.tutorId as any).id || pet.tutorId
    } as any);
    this.petDialog = true;
  }

  deletePet(pet: Pet) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${pet.name}?`,
      header: 'Confirmar Exclusao',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.petService.delete(pet.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet excluido' });
            this.loadPets();
          }
        });
      }
    });
  }

  hideDialog() {
    this.petDialog = false;
  }

  savePet() {
    const data = this.petForm.value as Pet;
    if (this.pet.id) {
      this.petService.update(this.pet.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet atualizado' });
          this.loadPets();
          this.hideDialog();
        }
      });
    } else {
      this.petService.create(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet criado' });
          this.loadPets();
          this.hideDialog();
        }
      });
    }
  }
}
