import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const mapAuthState = (state: AppState) => state.auth;

export const mapError = (state: AuthState) => state.error;
export const getAuthError = createSelector(mapAuthState, mapError);

export const mapIsLoading = (state: AuthState) => state.isLoading;
export const getAuthIsLoading = createSelector(mapAuthState, mapIsLoading);

export const mapLoggedUser = (state: AuthState) => state.loggedUser;
export const getLoggedUser = createSelector(mapAuthState, mapLoggedUser);
