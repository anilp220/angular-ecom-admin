import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true
})
export class DashboardComponent implements OnInit {
  private dbService = inject(DashboardService);

  loading = signal(true)

  stats = signal({
    products: 0,
    users: 0,
    carts: 0,
    revenue: 0
  })

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    forkJoin({
      products: this.dbService.getProducts().pipe(catchError(() => [{ total: 0 }])),
      users: this.dbService.getUsers().pipe(catchError(() => [{ total: 0 }])),
      carts: this.dbService.getCarts().pipe(catchError(() => [{ total: 0 }])),
    }).subscribe((res: any) => {
      console.log(res)
      const revenue =
        res.carts.carts
          .reduce(
            (sum: number, cart: any) =>
              sum + cart.total,
            0
          );

      this.stats.set({
        products: res.products.total,
        users: res.users.total,
        carts: res.carts.total,
        revenue
      });
      console.log(this.stats());
      this.loading.set(false);
    },error=>{
      console.log(error)
      this.loading.set(false);
    });
  }
}
