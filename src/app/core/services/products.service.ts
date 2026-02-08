import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResponse } from '../models/product.model';

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
    return this.http.get<ProductResponse>(
      `${this.base}?limit=${limit}&skip=${skip}`
    );
  }

  // ---------- SEARCH ----------

  searchProducts(
    query: string,
    limit = 10,
    skip = 0
  ) {
    return this.http.get<ProductResponse>(
      `${this.base}/search?q=${query}&limit=${limit}&skip=${skip}`
    );
  }

  getProductById(id: number) {
    return this.http.get<Product>(
      `${this.base}/${id}`
    );
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(
      `${this.base}/${id}`,
      product
    );
  }

  addProduct(product: Product) {
    return this.http.post<Product>(
      `${this.base}/add`,
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<void>(
      `${this.base}/${id}`
    );
  }
}
