import { CanActivateFn, Router } from '@angular/router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Converte a Promise para Observable
  return from(authService.validateUser()).pipe(
    map(logged => {
      if (!logged) {
        router.navigate(["/login"]);
      }
      return logged;
    })
  );
};