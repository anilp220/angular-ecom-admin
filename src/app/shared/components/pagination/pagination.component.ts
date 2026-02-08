import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent
  implements OnChanges {

  // ---------- INPUTS ----------

  @Input() page = 1;
  @Input() limit = 10;
  @Input() total = 0;

  // ---------- OUTPUT ----------

  @Output()
  pageChange = new EventEmitter<number>();

  // ---------- INTERNAL ----------

  totalPages = 0;
  pages: number[] = [];
  visiblePages = 5; // window size
  displayPages: (any)[] = [];

  ngOnChanges() {
    this.calculatePages();
  }

  calculatePages() {

    this.totalPages =
      Math.ceil(this.total / this.limit);

    const pages: (number | string)[] = [];

    if (this.totalPages <= this.visiblePages) {

      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }

    } else {

      const start =
        Math.max(
          2,
          this.page - 1
        );

      const end =
        Math.min(
          this.totalPages - 1,
          this.page + 1
        );

      pages.push(1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < this.totalPages - 1) {
        pages.push('...');
      }

      pages.push(this.totalPages);
    }

    this.displayPages = pages;
  }


  // ---------- NAVIGATION ----------

  goToPage(p: number) {
    this.pageChange.emit(p);
  }

  next() {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }

  prev() {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }
}
