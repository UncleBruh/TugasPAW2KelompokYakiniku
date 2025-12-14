import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Teacher } from '../../services/course';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.html'
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  form: Teacher = { name: '', email: '', phone: '', specialty: '', salary: 0 };
  isEditMode: boolean = false;

  constructor(private api: CourseService) {}

  ngOnInit() { 
    this.load(); 
  }

  load() {
    this.api.getTeachers().subscribe(data => this.teachers = data);
  }

  edit(data: Teacher) {
    this.isEditMode = true;
    this.form = { ...data };
  }

  batal() {
    this.isEditMode = false;
    this.form = { name: '', email: '', phone: '', specialty: '', salary: 0 };
  }

  simpan() {
    if (this.isEditMode && this.form._id) {
      this.api.updateTeacher(this.form._id, this.form).subscribe(() => {
        alert('Data pengajar berhasil diperbarui!');
        this.load();
        this.batal();
      });
    } else {
      this.api.addTeacher(this.form).subscribe(() => {
        alert('Pengajar baru berhasil ditambahkan!');
        this.load();
        this.batal();
      });
    }
  }

  hapus(id: string | undefined) {
    if (id && confirm('Hapus pengajar ini?')) {
      this.api.deleteTeacher(id).subscribe(() => this.load());
    }
  }
}