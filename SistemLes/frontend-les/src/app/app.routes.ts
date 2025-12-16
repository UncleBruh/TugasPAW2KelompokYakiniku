import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list';
import { StudentsComponent } from './components/students/students';
import { SchedulesComponent } from './components/schedules/schedules';
import { TeachersComponent } from './components/teachers/teachers';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { StudentScoreComponent } from './components/student-score/student-score';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: CourseListComponent, canActivate: [authGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [authGuard] },
  { path: 'students/score/:id', component: StudentScoreComponent, canActivate: [authGuard] },
  { path: 'schedules', component: SchedulesComponent, canActivate: [authGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];