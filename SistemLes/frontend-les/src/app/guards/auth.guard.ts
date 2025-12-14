import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CourseService } from '../services/course';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(CourseService);
  const router = inject(Router);

  if (service.isLoggedIn()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false;
  }
};