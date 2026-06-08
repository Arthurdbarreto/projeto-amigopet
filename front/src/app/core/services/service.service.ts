import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Service } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/services`;

  getAll(params?: any) {
    return this.http.get<{ services: Service[], total: number }>(this.apiUrl, { params });
  }

  getById(id: string) {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  create(data: Service) {
    return this.http.post<Service>(this.apiUrl, data);
  }

  update(id: string, data: Service) {
    return this.http.put<Service>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
