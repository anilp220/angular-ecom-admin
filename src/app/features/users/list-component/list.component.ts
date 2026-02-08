import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersService }
  from '../../../core/services/users.service';

import { PaginationComponent }
  from '../../../shared/components/pagination/pagination.component';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private service = inject(UsersService);

  users = signal<User[]>([]);
  total = signal(0);
  loading = signal(true);
  isSearched = signal(false);

  page = 1;
  limit = 10;
  search = '';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {

    this.loading.set(true);

    const skip =
      (this.page - 1) * this.limit;

    const apiCall = this.search
      ? this.service.searchUsers(
        this.search,
        this.limit,
        skip
      )
      : this.service.getUsers(
        this.limit,
        skip
      );

    apiCall.subscribe((res) => {

      this.users.set(res.users);
      this.total.set(res.total);

      this.loading.set(false);
    });
  }

  onSearch() {
    this.page = 1;
    this.isSearched.set(!!this.search);
    this.loadUsers();
  }

  onResetSearch() {
    this.search = '';
    this.page = 1;
    this.isSearched.set(false);
    this.loadUsers();
  }

  onPageChange(p: number) {
    this.page = p;
    this.loadUsers();
  }
}
