import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentScoreComponent } from './student-score';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('StudentScoreComponent', () => {
  let component: StudentScoreComponent;
  let fixture: ComponentFixture<StudentScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentScoreComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});