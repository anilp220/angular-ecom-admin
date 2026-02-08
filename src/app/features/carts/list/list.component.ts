import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CartsService }
  from '../../../core/services/carts.service';

import { PaginationComponent }
  from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-carts-list',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent
  implements OnInit {

  private service = inject(CartsService);

  carts = signal<any[]>([]);
  total = signal(0);
  loading = signal(true);

  page = 1;
  limit = 10;

  expandedCartId =
    signal<number | null>(null);

  ngOnInit() {
    this.loadCarts();
  }

  loadCarts() {

    this.loading.set(true);

    const skip =
      (this.page - 1) * this.limit;

    this.service
      .getCarts(this.limit, skip)
      .subscribe((res) => {

        this.carts.set(res.carts);
        this.total.set(res.total);
        this.loading.set(false);

      });
  }

  onPageChange(p: number) {
    this.page = p;
    this.loadCarts();
  }

  toggleExpand(id: number) {

    this.expandedCartId.set(
      this.expandedCartId() === id
        ? null
        : id
    );
  }
}
