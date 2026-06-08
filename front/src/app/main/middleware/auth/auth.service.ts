import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment';

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
  perfil?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface AuthPayload {
  user: {
    id: string;
    nome: string;
    email: string;
    perfil: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private refreshTokenKey = 'refreshToken';
  private userKey = 'amigopetUser';
  private apiUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginCredentials): Observable<ApiResponse<AuthPayload>> {
    return this.http.post<ApiResponse<AuthPayload>>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.persistSession(response.data))
    );
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthPayload>> {
    return this.http.post<ApiResponse<AuthPayload>>(`${this.apiUrl}/register`, payload).pipe(
      tap((response) => this.persistSession(response.data))
    );
  }

  private persistSession(payload: AuthPayload): void {
    localStorage.setItem(this.tokenKey, payload.tokens.accessToken);
    localStorage.setItem(this.refreshTokenKey, payload.tokens.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(payload.user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.exp > Date.now() / 1000;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}
