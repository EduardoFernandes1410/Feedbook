import { getLoggedUser } from './../../stores/auth/auth.selectors';
import { AppState } from './../../stores/reducers';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private store: Store<AppState>,
  ) {}
  async canActivate(): Promise<boolean> {
    const loggedUser = await this.store.select(getLoggedUser).pipe(first()).toPromise();
    if (!loggedUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
