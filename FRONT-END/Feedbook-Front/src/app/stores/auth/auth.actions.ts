import { UserData, RegisterData } from './../../models/auth';
import { createAction, union, props } from '@ngrx/store';
import { Credentials } from 'src/app/models/auth';
import { type } from 'src/app/utils/functions';

export const authActionTypes = {
  loginRequested: type('[Auth] -Auth login requested-'),
  loginCompleted: type('[Auth] -Auth login completed-'),
  registerRequested: type('[Auth] -Auth register requested-'),
  registerCompleted: type('[Auth] -Auth register completed-'),
  logout: type('[Auth] -Auth logout-'),
  authError: type('[Auth] -Auth error-'),
};

export const loginRequested = createAction(authActionTypes.loginRequested, props<{ user: Credentials }>());
export const loginCompleted = createAction(authActionTypes.loginCompleted, props<{ user: UserData }>());
export const registerRequested = createAction(authActionTypes.registerRequested, props<{ user: RegisterData }>());
export const registerCompleted = createAction(authActionTypes.registerCompleted, props<{ user: UserData }>());
export const logout = createAction(authActionTypes.logout);
export const authError = createAction(authActionTypes.authError, props<{ error: any }>());

const all = union({
  loginRequested,
  loginCompleted,
  registerRequested,
  registerCompleted,
  logout,
  authError,
});

export type AuthActionsTypes = typeof all;
