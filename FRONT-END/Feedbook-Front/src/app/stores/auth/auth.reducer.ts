import { createReducer, on, Action } from '@ngrx/store';
import { authEmptyState, AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

const reducer = createReducer(
  authEmptyState,
  on(AuthActions.loginRequested, state => ({ ...state, isLoading: true })),
  on(AuthActions.loginCompleted, (state, { user }) => ({ ...state, loggedUser: user, isLoading: false })),
  on(AuthActions.registerRequested, state => ({ ...state, isLoading: true })),
  on(AuthActions.registerCompleted, (state, { user }) => ({ ...state, loggedUser: user, isLoading: false })),
  on(AuthActions.logout, state => state = authEmptyState),
  on(AuthActions.authError, state => ({ ...state, isLoading: false })),
);

export function authReducer(state: AuthState, action: Action) {
  return reducer(state, action);
}
