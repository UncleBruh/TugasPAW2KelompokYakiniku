import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService, Course } from '../../services/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.html' 
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  form: Course = { name: '', level: '', description: '', price: 0, duration: '' };
  isEditMode: boolean = false;
  currentId: string = '';

  constructor(private courseSvc: CourseService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.courseSvc.getCourses().subscribe(data => this.courses = data);
  }

  edit(item: Course) {
    this.isEditMode = true;
    this.currentId = item._id || '';
    this.form = { ...item };
  }

  batal() {
    this.isEditMode = false;
    this.currentId = '';
    this.form = { name: '', level: '', description: '', price: 0, duration: '' };
  }

  simpan() {
    if (this.isEditMode) {
      this.courseSvc.updateCourse(this.currentId, this.form).subscribe(() => {
        alert('Data berhasil diperbarui!');
        this.load();
        this.batal();
      });
    } else {
      this.courseSvc.addCourse(this.form).subscribe(() => {
        alert('Data berhasil ditambahkan!');
        this.load();
        this.batal();
      });
    }
  }

  hapus(id: string | undefined) {
    if (id && confirm('Hapus kelas ini?')) {
      this.courseSvc.deleteCourse(id).subscribe(() => this.load());
    }
  }

  aturJadwal(item: Course) {
    this.router.navigate(['/schedules'], { queryParams: { courseName: item.name } });
  }
}