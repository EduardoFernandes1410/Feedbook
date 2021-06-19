import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public menuVisible: boolean;

  constructor() {
  }

  public toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  ngOnInit() {
    this.menuVisible = false;
  }
}
