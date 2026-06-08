import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tutor } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class TutorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tutors`;

  getAll(params?: any) {
    return this.http.get<{ tutors: Tutor[], total: number }>(this.apiUrl, { params });
  }

  getById(id: string) {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  create(data: Tutor) {
    return this.http.post<Tutor>(this.apiUrl, data);
  }

  update(id: string, data: Tutor) {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
