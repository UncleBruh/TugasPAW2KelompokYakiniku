import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course { _id?: string; name: string; level: string; price: number; duration: string; description?: string; }
export interface Student { _id?: string; name: string; email: string; phone: string; program: string; }
export interface Schedule { _id?: string; day: string; time: string; activity: string; teacher?: string;}
export interface User { username: string; password: string; }
export interface Teacher { _id?: string; name: string; email: string; phone: string; specialty: string; salary: number; }
export interface Score {_id?: string; studentId: string; testType: 'TOEFL' | 'IELTS' | 'TOEIC'; date: Date; sections: { listening: number; reading: number; structure?: number; writing?: number;   speaking?: number; }; finalScore: number; }

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(user: User) { return this.http.post(`${this.apiUrl}/register`, user); }
  login(user: User): Observable<any> { return this.http.post(`${this.apiUrl}/login`, user); }
  saveToken(token: string) { localStorage.setItem('token_les', token); }
  isLoggedIn(): boolean { return !!localStorage.getItem('token_les'); }
  logout() { localStorage.removeItem('token_les'); }

  getCourses(): Observable<Course[]> { return this.http.get<Course[]>(`${this.apiUrl}/courses`); }
  addCourse(data: Course) { return this.http.post(`${this.apiUrl}/courses`, data); }
  deleteCourse(id: string) { return this.http.delete(`${this.apiUrl}/courses/${id}`); }
  updateCourse(id: string, data: Course) { return this.http.put(`${this.apiUrl}/courses/${id}`, data); }
  
  getStudents(): Observable<Student[]> { return this.http.get<Student[]>(`${this.apiUrl}/students`); }
  addStudent(data: Student) { return this.http.post(`${this.apiUrl}/students`, data); }
  deleteStudent(id: string) { return this.http.delete(`${this.apiUrl}/students/${id}`); }
  updateStudent(id: string, data: Student) { return this.http.put(`${this.apiUrl}/students/${id}`, data); }
  
  getSchedules(): Observable<Schedule[]> { return this.http.get<Schedule[]>(`${this.apiUrl}/schedules`); }
  addSchedule(data: Schedule) { return this.http.post(`${this.apiUrl}/schedules`, data); }
  deleteSchedule(id: string) { return this.http.delete(`${this.apiUrl}/schedules/${id}`); }

  getTeachers(): Observable<Teacher[]> { return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`); }
  addTeacher(data: Teacher) { return this.http.post(`${this.apiUrl}/teachers`, data); }
  updateTeacher(id: string, data: Teacher) { return this.http.put(`${this.apiUrl}/teachers/${id}`, data); }
  deleteTeacher(id: string) { return this.http.delete(`${this.apiUrl}/teachers/${id}`); }

  addScore(data: Score) {
    return this.http.post(`${this.apiUrl}/scores`, data);
  }

  getScoresByStudent(studentId: string): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.apiUrl}/scores/student/${studentId}`);
  }
}