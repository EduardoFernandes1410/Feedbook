import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public visible: boolean;

  constructor() { }

  close() {
    this.visible = false;
  }

  ngOnInit() {
    this.visible = true;
  }

}
