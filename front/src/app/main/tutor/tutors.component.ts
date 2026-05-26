import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../middleware/auth/auth.service';
import { environment } from 'src/environments/environment';

export interface Tutor {
    id?: number;
    name: string;
    gender: string;
    age: string;
    code: string;
}

@Component({
    selector: 'app-tutors',
    templateUrl: './tutors.component.html'
})
export class TutorsComponent implements OnInit {

    tutors: Tutor[] = [];
    tutor: Tutor = { name: '', gender: '', age: '', code: '' };
    dialogVisible: boolean = false;
    loading: boolean = false;
    editMode: boolean = false;
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }

    ngOnInit() {
        this.loadTutors();
    }

    loadTutors() {
        this.loading = true;
        this.http.get<Tutor[]>(`${this.apiUrl}/alunos`, { headers: this.getHeaders() }).subscribe({
            next: (data) => { this.tutors = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    openNew() {
        this.tutor = { name: '', gender: '', age: '', code: '' };
        this.editMode = false;
        this.dialogVisible = true;
    }

    editTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        this.editMode = true;
        this.dialogVisible = true;
    }

    saveTutor() {
        if (this.editMode && this.tutor.id) {
            this.http.put(`${this.apiUrl}/alunos/${this.tutor.id}`, this.tutor, { headers: this.getHeaders() }).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor atualizado' });
                    this.loadTutors();
                    this.dialogVisible = false;
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar' })
            });
        } else {
            this.http.post(`${this.apiUrl}/alunos`, this.tutor, { headers: this.getHeaders() }).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor criado' });
                    this.loadTutors();
                    this.dialogVisible = false;
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar' })
            });
        }
    }

    deleteTutor(tutor: Tutor) {
        this.confirmationService.confirm({
            message: `Deseja excluir o tutor ${tutor.name}?`,
            accept: () => {
                this.http.delete(`${this.apiUrl}/alunos/${tutor.id}`, { headers: this.getHeaders() }).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor excluído' });
                        this.loadTutors();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir' })
                });
            }
        });
    }
}
