import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMsg = '';

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {

    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.form.value)
      .subscribe({

        next: (res: any) => {

          this.auth.setSession(res);

          this.router.navigateByUrl('/');
          this.auth.getMe().subscribe({
            next: (user) => {
              console.log('User info:', user);
            },
            error: () => {
              console.error('Failed to fetch user info');
            }
          });
        },

        error: () => {
          this.errorMsg = 'Invalid credentials';
          this.loading = false;
        }
      });
  }
}
