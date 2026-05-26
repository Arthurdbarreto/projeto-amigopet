import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../middleware/auth/auth.service';

export interface Pet {
    id?: number;
    name: string;
    gender: string;
    id_tutor: number;
    color: string;
    breed: string;
}

@Injectable({
    providedIn: 'root'
})
export class PetService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }

    getPets(): Observable<Pet[]> {
        return this.http.get<Pet[]>(`${this.apiUrl}/pets`, { headers: this.getHeaders() });
    }

    getPet(id: number): Observable<Pet> {
        return this.http.get<Pet>(`${this.apiUrl}/pets/${id}`, { headers: this.getHeaders() });
    }

    createPet(pet: Pet): Observable<Pet> {
        return this.http.post<Pet>(`${this.apiUrl}/pets`, pet, { headers: this.getHeaders() });
    }

    updatePet(id: number, pet: Pet): Observable<Pet> {
        return this.http.put<Pet>(`${this.apiUrl}/pets/${id}`, pet, { headers: this.getHeaders() });
    }

    deletePet(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/pets/${id}`, { headers: this.getHeaders() });
    }
}
