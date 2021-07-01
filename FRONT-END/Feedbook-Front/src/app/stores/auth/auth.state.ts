import { UserData } from './../../models/auth';

export interface AuthState {
  loggedUser: UserData;
  isLoading: boolean;
  error: any;
}

export const authEmptyState: AuthState = {
  loggedUser: null,
  isLoading: false,
  error: null,
};
