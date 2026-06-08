import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Appointment } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/appointments`;

  getAll(params?: any) {
    return this.http.get<{ appointments: Appointment[], total: number }>(this.apiUrl, { params });
  }

  getById(id: string) {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  create(data: Appointment) {
    return this.http.post<Appointment>(this.apiUrl, data);
  }

  update(id: string, data: Appointment) {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
