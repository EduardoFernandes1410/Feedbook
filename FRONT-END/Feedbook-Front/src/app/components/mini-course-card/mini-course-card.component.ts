import { SubjectItem } from './../../models/feed';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-course-card',
  templateUrl: './mini-course-card.component.html',
  styleUrls: ['./mini-course-card.component.scss']
})
export class MiniCourseCardComponent implements OnInit {

  @Input() subject: SubjectItem;

  constructor() { }

  ngOnInit() {
  }

}
