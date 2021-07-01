import { FeedState } from './feed/feed.state';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { feedReducer } from './feed/feed.reducer';

// tslint:disable-next-line: no-empty-interface
export interface AppState {
  auth: AuthState;
  feed: FeedState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  feed: feedReducer,
};

export const mapApplicationState = (state: AppState) => state;
export const getApplicationState = createSelector(mapApplicationState, (state: AppState) => state);
