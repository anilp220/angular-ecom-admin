import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersService }
  from '../../../core/services/users.service';

import { PaginationComponent }
  from '../../../shared/components/pagination/pagination.component';
import { User } from '../../../core/models/user.model';
import { RouterModule } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private service = inject(UsersService);
  searchControl =
    new FormControl('');

  users = signal<User[]>([]);
  total = signal(0);
  loading = signal(true);
  isSearched = signal(false);

  page = 1;
  limit = 10;
  search = '';

  ngOnInit() {
    this.loadUsers();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.page = 1;
          this.loading.set(true);
        }),
        switchMap((query) => {
          const skip =
            (this.page - 1) * this.limit;

          if (!query) {

            return this.service.getUsers(
              this.limit,
              skip
            );
          }

          return this.service.searchUsers(
            query,
            this.limit,
            skip
          );
        })
      )
      .subscribe((res) => {
        this.users.set(res.users);
        this.total.set(res.total);
        this.loading.set(false);
        this.isSearched.set(!!this.searchControl.value);
      });
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
    this.searchControl.setValue('');
    this.page = 1;
    this.isSearched.set(false);
    this.loadUsers();
  }

  onPageChange(p: number) {
    this.page = p;
    const query =
      this.searchControl.value;

    const skip =
      (this.page - 1) * this.limit;

    const apiCall = query
      ? this.service.searchUsers(
        query,
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

    });
  }
}
