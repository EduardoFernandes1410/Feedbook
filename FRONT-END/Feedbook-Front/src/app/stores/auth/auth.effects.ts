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
            this.router.navigate(['/feed']);
          });
        }),
      ),
    { dispatch: false },
  );

  registerRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authActionTypes.registerRequested),
      switchMap((action) => {
        return from(this.authService.register(action.user)).pipe(
          map(user => AuthActions.registerCompleted({ user })),
          catchError(error => of(AuthActions.authError({ error }))),
        );
      }),
    ),
  );

  registerCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authActionTypes.registerCompleted),
        tap(async () => {
          this.ngZone.run(() => {
            this.router.navigate(['/feed']);
          });
        }),
      ),
    { dispatch: false },
  );

  userUpdateRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authActionTypes.userUpdateRequested),
      switchMap((action) => {
        return from(this.authService.update(action.userData, action.token)).pipe(
          map(user => AuthActions.userUpdateCompleted({ user })),
          catchError(error => of(AuthActions.authError({ error }))),
        );
      }),
    ),
  );

  userUpdateCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authActionTypes.userUpdateCompleted),
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
