import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductsService);

  loading = signal(false);
  isEditMode = signal(false);
  productId!: number;

  form = this.fb.group({
    title: ['', Validators.required],
    price: [0, Validators.required],
    brand: [''],
    category: [''],
    stock: [0],
    description: [''],
    thumbnail: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.productId = Number(id);

      this.loadProduct();
    }
  }

  loadProduct() {
    this.loading.set(true);
    this.service.getProductById(this.productId).subscribe(product => {
      this.form.patchValue(product);
      this.loading.set(false);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);

    const apiCall =
      this.isEditMode()
        ? this.service.updateProduct(
          this.productId,
          this.form.value as Product
        )
        : this.service.addProduct(
          this.form.value as Product
        );


    apiCall.subscribe((res) => {
      console.log(res)

      this.loading.set(false);

      this.router.navigateByUrl(
        '/products'
      );

    });
  }
}
