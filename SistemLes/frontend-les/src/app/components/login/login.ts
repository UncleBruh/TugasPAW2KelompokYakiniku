import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { CourseService, User } from '../../services/course';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  user: User = { username: '', password: '' };

  constructor(private api: CourseService, private router: Router) {}

  masuk() {
    this.api.login(this.user).subscribe({
      next: (res: any) => {
        this.api.saveToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => alert('Login Gagal: ' + err.error.message)
    });
  }
}