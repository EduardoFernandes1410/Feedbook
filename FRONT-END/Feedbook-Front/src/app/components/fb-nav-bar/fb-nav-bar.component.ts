import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fb-nav-bar',
  templateUrl: './fb-nav-bar.component.html',
  styleUrls: ['./fb-nav-bar.component.scss']
})
export class FbNavBarComponent implements OnInit {
  public menuVisible: boolean;
  @Input() searchBox: boolean;
  @Input() configButton: boolean;

  constructor() { }

  public toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  ngOnInit() {
    this.menuVisible = false;
  }
}
