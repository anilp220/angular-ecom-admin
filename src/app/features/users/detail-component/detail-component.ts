import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.scss',
})
export class DetailComponent implements OnInit {
  private service = inject(UsersService);
  private route = inject(ActivatedRoute);

  user = signal<User | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getUserDetail(id).subscribe((res) => {
      this.user.set(res);
      this.loading.set(false);
    });
  }
}
