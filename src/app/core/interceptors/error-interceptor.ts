import { HttpInterceptorFn }
  from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError }
  from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor:
  HttpInterceptorFn = (req, next) => {
    const toast = inject(ToastService);

    const router = inject(Router);

    return next(req).pipe(

      catchError((error) => {

        // ---------- 401 ----------

        if (error.status === 401) {
          toast.show(
            'Session expired',
            'warning'
          );

          router.navigateByUrl('/login');

        }

        // ---------- 500 ----------

        if (error.status >= 500) {

          toast.show(
            'Server error occurred',
            'error'
          );

        }

        // ---------- NETWORK ----------

        if (error.status === 0) {

          toast.show(
            'Network error',
            'error'
          );

        }

        return throwError(() => error);
      })

    );
  };
