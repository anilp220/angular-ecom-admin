import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = auth.isLoggedIn();

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(
    ['/login']
  );

};

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = auth.isLoggedIn();

  if (!isLoggedIn) {
    return true;
  }

  return router.createUrlTree(
    ['/']
  );
};
