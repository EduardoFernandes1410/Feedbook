import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCourseCardComponent } from './mini-course-card.component';

describe('MiniCourseCardComponent', () => {
  let component: MiniCourseCardComponent;
  let fixture: ComponentFixture<MiniCourseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCourseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
