import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }

    list<T>(resource: string): Observable<T[]> {
        return this.http.get<ApiResponse<T[]>>(`${environment.baseUrl}/${resource}`).pipe(map((response) => response.data));
    }

    create<T>(resource: string, payload: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(`${environment.baseUrl}/${resource}`, payload).pipe(map((response) => response.data));
    }

    update<T>(resource: string, id: string, payload: any): Observable<T> {
        return this.http.put<ApiResponse<T>>(`${environment.baseUrl}/${resource}/${id}`, payload).pipe(map((response) => response.data));
    }

    remove(resource: string, id: string): Observable<void> {
        return this.http.delete<ApiResponse<void>>(`${environment.baseUrl}/${resource}/${id}`).pipe(map(() => undefined));
    }
}
