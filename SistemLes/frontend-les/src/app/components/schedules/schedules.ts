import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService, Schedule, Course, Teacher } from '../../services/course';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedules.html'
})
export class SchedulesComponent implements OnInit {
  schedules: Schedule[] = [];
  courseList: Course[] = [];
  teacherList: Teacher[] = [];
  form: Schedule = { day: '', time: '', activity: '', teacher: '' };

  constructor(private api: CourseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.load();
    
    this.route.queryParams.subscribe(params => {
      if (params['courseName']) {
        this.form.activity = params['courseName'];
      }
    });
  }

  load() {
    this.api.getSchedules().subscribe(data => this.schedules = data);
    this.api.getCourses().subscribe(data => this.courseList = data);
    this.api.getTeachers().subscribe(data => this.teacherList = data); 
  }

  simpan() {
    this.api.addSchedule(this.form).subscribe(() => {
      alert('Jadwal berhasil ditambahkan!');
      this.load();
      const currentActivity = this.form.activity;
      this.form = { day: '', time: '', activity: currentActivity, teacher: '' };
    });
  }

  hapus(id: string | undefined) {
    if (id && confirm('Hapus jadwal ini?')) {
      this.api.deleteSchedule(id).subscribe(() => this.load());
    }
  }
}