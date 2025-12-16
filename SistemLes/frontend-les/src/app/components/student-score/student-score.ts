import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService, Score } from '../../services/course';

@Component({
  selector: 'app-student-score',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-score.html'
})
export class StudentScoreComponent implements OnInit {
  studentId: string = '';
  testType: 'TOEFL' | 'IELTS' | 'TOEIC' = 'TOEFL';
  
  sections = {
    listening: 0,
    structure: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  };

  constructor(
    private route: ActivatedRoute,
    private api: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
  }

  hitungScore(): number {
    if (this.testType === 'TOEFL') {
      return Math.round(((this.sections.listening + this.sections.structure + this.sections.reading) * 10) / 3);
    } 
    else if (this.testType === 'IELTS') {
      const total = this.sections.listening + this.sections.reading + this.sections.writing + this.sections.speaking;
      return parseFloat((total / 4).toFixed(1));
    } 
    else if (this.testType === 'TOEIC') {
      return this.sections.listening + this.sections.reading;
    }
    return 0;
  }

  simpan() {
    const data: Score = {
      studentId: this.studentId,
      testType: this.testType,
      date: new Date(),
      sections: {
        listening: this.sections.listening,
        reading: this.sections.reading,
        structure: this.testType === 'TOEFL' ? this.sections.structure : undefined,
        writing: this.testType === 'IELTS' ? this.sections.writing : undefined,
        speaking: this.testType === 'IELTS' ? this.sections.speaking : undefined,
      },
      finalScore: this.hitungScore()
    };

    this.api.addScore(data).subscribe(() => {
      alert(`Nilai ${this.testType} berhasil disimpan! Skor: ${data.finalScore}`);
      this.router.navigate(['/students']);
    });
  }
}