import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartsService {

  private http = inject(HttpClient);

  private base =
    'https://dummyjson.com/carts';

  getCarts(
    limit = 10,
    skip = 0
  ) {
    return this.http.get<any>(
      `${this.base}?limit=${limit}&skip=${skip}`
    );
  }

}
