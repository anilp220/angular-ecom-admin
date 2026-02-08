import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<any>(
      'https://dummyjson.com/products'
    );
  }

  getUsers() {
    return this.http.get<any>(
      'https://dummyjson.com/users'
    );
  }

  getCarts() {
    return this.http.get<any>(
      'https://dummyjson.com/carts'
    );
  }
}
