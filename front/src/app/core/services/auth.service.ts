import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  // Signals for reactive state
  private userSignal = signal<User | null>(this.getUserFromStorage());
  private tokenSignal = signal<string | null>(localStorage.getItem('token'));

  // Computed properties
  currentUser = computed(() => this.userSignal());
  isAuthenticated = computed(() => !!this.tokenSignal());

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        this.saveSession(res.token, res.user);
      })
    );
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout() {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  private saveSession(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  private clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
