import { first } from 'rxjs/operators';
import { getLoggedUser } from './../../stores/auth/auth.selectors';
import { AppState } from './../../stores/reducers';
import { UserData } from './../../models/auth';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/stores/auth/auth.actions';

@Component({
  selector: 'app-fb-nav-bar',
  templateUrl: './fb-nav-bar.component.html',
  styleUrls: ['./fb-nav-bar.component.scss']
})
export class FbNavBarComponent implements OnInit {

  public menuVisible: boolean;
  public loggedUser$: Observable<UserData>;

  @Input() searchBox: boolean;
  @Input() configButton: boolean;
  @Output() whenSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private store: Store<AppState>,
  ) { }

  public toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  public emmitChange(event: any){
    this.whenSearch.emit(event.target.value);
  }

  public logout() {
    this.store.dispatch(logout());
  }

  async ngOnInit() {
    this.menuVisible = false;
    this.loggedUser$ = this.store.select(getLoggedUser);
  }
}
