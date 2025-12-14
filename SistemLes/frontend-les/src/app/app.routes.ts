import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list';

import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: CourseListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];