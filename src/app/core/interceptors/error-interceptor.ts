import { HttpInterceptorFn }
  from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError }
  from 'rxjs';

export const errorInterceptor:
  HttpInterceptorFn = (req, next) => {

    const router = inject(Router);

    return next(req).pipe(

      catchError((error) => {

        // ---------- 401 ----------

        if (error.status === 401) {

          router.navigateByUrl('/login');

        }

        // ---------- 500 ----------

        if (error.status >= 500) {

          alert(
            'Server error occurred'
          );

        }

        // ---------- NETWORK ----------

        if (error.status === 0) {

          alert(
            'Network error'
          );

        }

        return throwError(() => error);
      })

    );
  };
