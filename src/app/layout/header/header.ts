import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true
})
export class Header {
  private auth = inject(AuthService);
  private router = inject(Router);
  @Output()
  menuToggle = new EventEmitter<void>();

  user = this.auth.user;

  toggleMenu() {
    this.menuToggle.emit();
  }
  logout() {
    console.log(this.user())
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
