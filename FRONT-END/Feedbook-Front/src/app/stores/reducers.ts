import { ActionReducerMap, createSelector } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';

// tslint:disable-next-line: no-empty-interface
export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const mapApplicationState = (state: AppState) => state;
export const getApplicationState = createSelector(mapApplicationState, (state: AppState) => state);
