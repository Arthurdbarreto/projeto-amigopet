import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getAll(params?: any) {
    return this.http.get<{ products: Product[], total: number }>(this.apiUrl, { params });
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: Product) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, data: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
