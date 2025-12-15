import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list';

import { TeachersComponent } from './components/teachers/teachers';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { SchedulesComponent } from './components/schedules/schedules';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: CourseListComponent, canActivate: [authGuard] },
  {path: 'schedules', component: SchedulesComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teachers', component: TeachersComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];