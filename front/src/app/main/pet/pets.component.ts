import { Component, OnInit } from '@angular/core';
import { Pet, PetService } from './services/pet.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-pets',
    templateUrl: './pets.component.html'
})
export class PetsComponent implements OnInit {

    pets: Pet[] = [];
    pet: Pet = { name: '', gender: '', id_tutor: 0, color: '', breed: '' };
    dialogVisible: boolean = false;
    loading: boolean = false;
    editMode: boolean = false;

    constructor(
        private petService: PetService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadPets();
    }

    loadPets() {
        this.loading = true;
        this.petService.getPets().subscribe({
            next: (data) => { this.pets = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    openNew() {
        this.pet = { name: '', gender: '', id_tutor: 0, color: '', breed: '' };
        this.editMode = false;
        this.dialogVisible = true;
    }

    editPet(pet: Pet) {
        this.pet = { ...pet };
        this.editMode = true;
        this.dialogVisible = true;
    }

    savePet() {
        if (this.editMode && this.pet.id) {
            this.petService.updatePet(this.pet.id, this.pet).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet atualizado' });
                    this.loadPets();
                    this.dialogVisible = false;
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar' })
            });
        } else {
            this.petService.createPet(this.pet).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet criado' });
                    this.loadPets();
                    this.dialogVisible = false;
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar' })
            });
        }
    }

    deletePet(pet: Pet) {
        this.confirmationService.confirm({
            message: `Deseja excluir o pet ${pet.name}?`,
            accept: () => {
                this.petService.deletePet(pet.id!).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet excluído' });
                        this.loadPets();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir' })
                });
            }
        });
    }
}
