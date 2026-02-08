import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private http = inject(HttpClient);

  private base =
    'https://dummyjson.com/products';

  // ---------- LIST ----------

  getProducts(
    limit = 10,
    skip = 0
  ) {
    return this.http.get<Product[]>(
      `${this.base}?limit=${limit}&skip=${skip}`
    );
  }

  // ---------- SEARCH ----------

  searchProducts(
    query: string,
    limit = 10,
    skip = 0
  ) {
    return this.http.get<any>(
      `${this.base}/search?q=${query}&limit=${limit}&skip=${skip}`
    );
  }

}
