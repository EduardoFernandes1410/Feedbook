import { SubjectItem } from './../../models/feed';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mini-course-card',
  templateUrl: './mini-course-card.component.html',
  styleUrls: ['./mini-course-card.component.scss']
})
export class MiniCourseCardComponent implements OnInit {

  @Input() subject: SubjectItem;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("http://" + imageUrl);
  }
  ngOnInit() {
  }

}
