import { map, switchMap, catchError, tap, first } from 'rxjs/operators';
import { AuthService } from './../../services/auth/auth.service';
import { from, of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { getLoggedUser } from './auth.selectors';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions<AuthActions.AuthActionsTypes>,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    private ngZone: NgZone,
  ) { }

  loginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authActionTypes.loginRequested),
      switchMap((action) => {
        return from(this.authService.login(action.user)).pipe(
          map(user => AuthActions.loginCompleted({ user })),
          catchError(error => of(AuthActions.authError({ error }))),
        );
      }),
    ),
  );

  loginCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authActionTypes.loginCompleted),
        tap(async () => {
          this.ngZone.run(() => {
            this.router.navigate(['/questions']);
          });
        }),
      ),
    { dispatch: false },
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authActionTypes.logout),
        tap(() => this.authService.logout()),
      ),
    { dispatch: false },
  );

  authError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authActionTypes.authError),
      ),
    { dispatch: false },
  );

}
