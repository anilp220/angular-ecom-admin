import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  private http = inject(HttpClient);

  private base =
    'https://dummyjson.com/users';

  // ---------- LIST ----------

  getUsers(
    limit = 10,
    skip = 0
  ) {
    return this.http.get<UserResponse>(
      `${this.base}?limit=${limit}&skip=${skip}`
    );
  }

  // ---------- SEARCH ----------

  searchUsers(
    query: string,
    limit = 10,
    skip = 0
  ) {
    return this.http.get<UserResponse>(
      `${this.base}/search?q=${query}&limit=${limit}&skip=${skip}`
    );
  }

  getUserDetail(id: number) {
    return this.http.get<User>(
      `${this.base}/${id}`
    );
  }
}
