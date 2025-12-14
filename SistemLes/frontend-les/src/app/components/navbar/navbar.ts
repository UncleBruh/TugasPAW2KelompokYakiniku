import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule], 
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  constructor(public api: CourseService, private router: Router) {}

  keluar() {
    this.api.logout();
    this.router.navigate(['/login']);
  }
}