import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourseService, User } from '../../services/course';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  user: User = { username: '', password: '' };

  constructor(private api: CourseService, private router: Router) {}

  daftar() {
    this.api.register(this.user).subscribe({
      next: () => {
        alert('Registrasi Berhasil! Silakan Login.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Gagal: ' + err.error.message)
    });
  }
}