import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pet } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class PetService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pets`;

  getAll(params?: any) {
    return this.http.get<{ pets: Pet[], total: number }>(this.apiUrl, { params });
  }

  getById(id: string) {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  create(data: Pet) {
    return this.http.post<Pet>(this.apiUrl, data);
  }

  update(id: string, data: Pet) {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
