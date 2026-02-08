import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule,FormsModule,PaginationComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true
})
export class ListComponent implements OnInit {
  private productService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);
  total = signal(0);
  isSearched = signal(false);
  currentPage = signal(1);

  page = 1;
  limit = 10;
  search = '';
  pageCount = 1;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    
    const skip = (this.page - 1) * this.limit;
    this.currentPage.set(this.page);

    const apiCall = this.search 
      ? this.productService.searchProducts(this.search, this.limit, skip) 
      : this.productService.getProducts(this.limit, skip);

    apiCall.subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.total.set(res.total);
        this.loading.set(false);
        this.pageCount = Math.ceil(res.total / this.limit);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  onResetSearch(){
    this.search = '';
    this.loadProducts();
    this.isSearched.set(false);
  }

  nextPage(){
    this.page++;
    this.loadProducts();
  }

  prevPage(){
    if(this.page == 1) return;
    this.page--;
    this.loadProducts();
  }

  onSearch(){
    this.page = 1;
    this.loadProducts();
    this.isSearched.set(true);
  }

  goToPage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  onPageChange(page: number){
    this.page = page;
    this.loadProducts();
  }
}
