import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true
})
export class DetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  product = signal<Product | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe(product => {
        this.product.set(product);
        this.loading.set(false);
        console.log(this.product());
      });
    }
  }

  onThumbnailClick(img: string) {
    // Set the main image to the clicked thumbnail
    this.product.update(p => p ? { ...p, thumbnail: img } : null);
  }

}
