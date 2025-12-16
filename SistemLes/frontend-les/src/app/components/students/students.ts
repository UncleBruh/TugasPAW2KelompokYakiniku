import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService, Student, Course } from '../../services/course'; // Tambah Course

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './students.html'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  courseList: Course[] = []; 
  
  form: Student = { name: '', email: '', phone: '', program: '' };
  isEditMode: boolean = false;

  constructor(private api: CourseService) {}

  ngOnInit() { 
    this.load(); 
  }

  load() {
    this.api.getStudents().subscribe(data => this.students = data);
    
    this.api.getCourses().subscribe(data => this.courseList = data);
  }

  edit(data: Student) {
    this.isEditMode = true;
    this.form = { ...data };
  }

  batal() {
    this.isEditMode = false;
    this.form = { name: '', email: '', phone: '', program: '' };
  }

  simpan() {
    if (this.isEditMode && this.form._id) {
      this.api.updateStudent(this.form._id, this.form).subscribe(() => {
        alert('Data siswa diperbarui!');
        this.load();
        this.batal();
      });
    } else {
      this.api.addStudent(this.form).subscribe(() => {
        alert('Siswa berhasil didaftarkan!');
        this.load();
        this.batal();
      });
    }
  }

  hapus(id: string | undefined) {
    if (id && confirm('Hapus siswa ini?')) {
      this.api.deleteStudent(id).subscribe(() => this.load());
    }
  }
}