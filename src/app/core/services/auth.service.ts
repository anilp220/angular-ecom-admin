import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../models/auth.model';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);

  private router = inject(Router);

  private baseUrl = 'https://dummyjson.com/auth';

  // Signal holds runtime auth state
  user = signal<AuthUser | null>(this.getStoredUser());

  // ---------- LOGIN ----------

  login(payload: any) {
    return this.http.post<AuthUser>(
      `${this.baseUrl}/login`,
      payload
    );
  }

  getMe() {
    return this.http.get<AuthUser>(`${this.baseUrl}/me`);
  }

  // ---------- SESSION SET ----------

  setSession(user: AuthUser) {

    localStorage.setItem(
      STORAGE_KEYS.AUTH_USER,
      JSON.stringify(user)
    );

    this.user.set(user);
  }

  // ---------- SESSION GET ----------

  getStoredUser(): AuthUser | null {

    const data = localStorage.getItem(
      STORAGE_KEYS.AUTH_USER
    );

    return data ? JSON.parse(data) : null;
  }

  // ---------- TOKEN GET ----------

  getToken(): string | null {
    const user = this.user();
    return user?.accessToken || null;
  }

  // ---------- LOGIN STATE ----------

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ---------- LOGOUT ----------

  logout() {

    localStorage.removeItem(
      STORAGE_KEYS.AUTH_USER
    );

    this.user.set(null);
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }
}
