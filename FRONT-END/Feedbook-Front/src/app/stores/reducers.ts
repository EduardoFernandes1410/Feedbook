import { SubjectState } from './subject/subject.state';
import { FeedState } from './feed/feed.state';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { feedReducer } from './feed/feed.reducer';
import { subjectReducer } from './subject/subject.reducer';

// tslint:disable-next-line: no-empty-interface
export interface AppState {
  auth: AuthState;
  feed: FeedState;
  subject: SubjectState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  feed: feedReducer,
  subject: subjectReducer,
};

export const mapApplicationState = (state: AppState) => state;
export const getApplicationState = createSelector(mapApplicationState, (state: AppState) => state);
