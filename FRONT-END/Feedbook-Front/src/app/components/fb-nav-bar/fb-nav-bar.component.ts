import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fb-nav-bar',
  templateUrl: './fb-nav-bar.component.html',
  styleUrls: ['./fb-nav-bar.component.scss']
})
export class FbNavBarComponent implements OnInit {
  public menuVisible: boolean;
  @Input() searchBox: boolean;
  @Input() configButton: boolean;
  @Output() whenSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  public emmitChange(event: any){
    this.whenSearch.emit(event.target.value);
  }

  ngOnInit() {
    this.menuVisible = false;
  }
}
